const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const date = require('date-and-time');  //for naming collections
var cors = require('cors');
const jwt = require('jsonwebtoken');


// Initialize the app
const app = express();

// https://expressjs.com/en/guide/routing.html
// app.use(bodyParser.urlencoded({extended: true}))
//urlencoded function extracts form data and puts them into the body of the res object
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());  //Needed
// Then use it before your routes are set up:
app.use(cors());
const PORT = 3001;



app.get('', (req, res)=> {
  res.send('Welcome to Express Server, running on port :'+PORT);
});

//MongoDb Setup

var mongoDbURL = 'mongodb://localhost:27017'
MongoClient.connect(mongoDbURL, (err, database) => {
     console.log('server connected');
     if(err) throw err;
     db = database.db('angkart') 
     // whatever your database name is
     
     app.listen(PORT, () => {
     console.log('listening on 3001');
  })
});
// Start the server
// app.listen(3000, () => {
//  console.log('Go to http://localhost:3000/users to see users');
// });

/* *****************************************************************
 >>>>>>>>>>>> APIs for AngKart Starts from here <<<<<<<<<<<<
*********************************************************************/

app.post('/api/register', (req, res)=>{
  let userData = req.body;
  db.collection('users').insertOne(userData, (err, result)=> {
      if (err) 
      {
        console.log(err);
        res.status(401).send('error');
        return;
      }
      else
      {
        console.log(result.insertedId);
        let payload = { subject: result.insertedId};
        let token = jwt.sign(payload, 'secretKey');
        res.status(200).send({token});
        return;
      }
      
  });
});

app.post('/api/login', (req, res)=> {
  try{
    let userData = req.body;
  let iemail = userData.email;
  let ipwd = userData.pwd;
  // console.log(iemail, ipwd);
  db.collection('users').findOne(
    { email: iemail, pwd: ipwd}, 
    (err, result)=>{
    if (err) {
      // console.log(err);
      res.status(401).send(err);
      return;
    }
    else
    {
      // console.log('inside else');
      if(result === null || typeof result === 'undefined' || result === 'null')
      {
        // console.log('inside null result');
        res.status(200).send(result);
        return;
      }
      else
      {

          // console.log(result);
          let payload = { subject: result._id};
          let token = jwt.sign(payload, 'secretKey');
          res.status(200).send(
            { token: token, result: result._id, fname: result.fname});
          return;
      }
    }
    
  });
}
catch(e)
{
  res.status(401).send('error');
}

});


app.post('/api/addwishlist', verifyToken, (req, res)=> {
  const wishlistData = req.body;

  db.collection('wl'+wishlistData.id).insertOne({
    'pid': wishlistData.prodid
  }, (err, result)=> {
    if (err)
    {
      console.log(err);
      res.status(401).send('error');
      return;
    }
    else
    {
      res.status(200).send(result);
      return;
    }
  });

});


app.post('/api/rmwishlist', verifyToken, (req, res)=> {
  const wishlistData = req.body;
  const userid = wishlistData.userid;
  const pid = wishlistData.pid;

  db.collection('wl'+userid).deleteMany(
    { 
      "pid": pid
    }, 
    (err, result)=> {
      if (err)
      {
        console.log(err);
        res.status(401).send('error');
        return;
      }
      else
      {
        res.status(200).send(result);
        return;
      }
    });
});

app.post('/api/getwishlist', verifyToken, (req, res)=> {
    let idData = req.body;
    let id = idData.id;
    let collection = 'wl'+id;
    db.collection(collection).distinct("pid", {}, (err, result)=> {

      if(err) 
      {
        console.log(err);
        res.status(401).send('error');
        return;
      }
      else
      {
        res.status(200).send(result);
        return;
      }

    });
});


app.post('/api/addtocart', verifyToken, (req, res)=> {
  const cartData = req.body;
  //Extract data from the request body
  const id = cartData.id;
  const pid = cartData.pid;
  const qty = cartData.qty;
  const cost = cartData.cost;
  const collectionName = 'cart'+cartData.id;
  // console.log(` ${id} ${pid} ${qty} ${cost}`);

  //Find out whether the item already exists or not;
  db.collection(collectionName).findOne({
    "pid": cartData.pid
  }, {}, (err, result)=> {
    if (err){
      console.log(err);
      return;
    }
    if(result === null || result === 'null') //if the item is not present already, add it as a fresh document
    {
      db.collection(collectionName).insertOne({
        "pid": cartData.pid,
        "qty": cartData.qty,
        "cost": cartData.cost
      }, (err, result)=> {
    
        if (err)
        {
          console.log(err);
          res.status(401).send('error');
          return;
        }
        else
        {
          console.log('success');
    
          res.status(200).send(result);
          return;
        }
      });
    }
    else  //if the item already exists, then update the qty and cost
    {
      db.collection(collectionName).updateMany(
        {
          "pid": cartData.pid
        },
        {
          $set: { "qty": cartData.qty, "cost": cartData.cost}
        },
        (err, result)=> {

          if(err) 
          {
            console.log(err);
            res.status(401).send(err);
            return;
          }
          res.status(200).send(result);
          return;
        });
    }
  });
});


app.post('/api/getcart', verifyToken, (req, res)=> {
  const idData = req.body;
  const collectionName = 'cart'+idData.id;
  console.log('ID is'+idData.id);

  db.collection(collectionName).find({}).toArray((error, result) => {
    if (error) throw error;
    res.status(200).send(result);
});

});

app.post('/api/placeorder', verifyToken, (req, res)=> {

  //Get the shipping address and UserId from request body
  const shipdata = req.body;
  console.log(shipdata.shipaddress);
  console.log(shipdata.id);
  console.log(shipdata.cart);

  //collection naming for order collections
  const now = new Date();
  const time = date.format(now, 'YYYYMMDDHHmmss');
  // console.log(time);

  
  const shipaddcolname = 'shipadd'+shipdata.id;

  const ordercolname = 'order'+shipdata.id+time;
  db.collection(shipaddcolname).insertOne( shipdata.shipaddress, (err, result)=> {

    if(err)
    {
      console.log('err1'+err);
      res.status(401).send('error1');
      return;
    }
    else
    {
      db.collection(ordercolname).insertMany(shipdata.cart, (err, result)=> {
        if(err)
        {
            console.log('err3'+err);
            res.status(401).send('error3');
            return;
        }
        else
        {

          db.collection('orders'+shipdata.id).insertOne(
            { 
              "ordercolname": ordercolname,
              "ordertime": time
            },
            (err, result)=> {

              if(err)
              {
                  console.log(err);
                  res.status(401).send('error4');
                  return;
              }
              else
              {
                res.status(200).send({'ordercolname': ordercolname});
                return;
              }

            })
          // res.status(200).send(result);
          // return;
        }
      })
    }
  })




})

//VerifyToken function to verify the token from the LocalStorage
function verifyToken(req, res, next)
{
  try {
    console.log('Headers'+req.headers);
  if (!req.headers.authorization)
  {
    console.log('1');
    return res.status(401).send('Unauthorized request');
  }
  
  let token = req.headers.authorization.split(' ')[1];
  let token1 = req.headers.authorization.split(' ')[0];
  console.log(token, token1);
  if (token === 'null' || token === null || token1 === null || token1 === 'null')
  {
    console.log('2');
      return res.status(401).send('Unauthorized request');
  }
  
  let payload = jwt.verify(token, 'secretKey');
  console.log('payload '+payload.subject);
  if(!payload)
  {
    console.log('3');
    return res.status(401).send('Unauthorized request');
  }

  console.log('5');
  req.userId = payload.subject;
  next();
  }
  catch(e)
  { 
    console.log('4');
    return res.status(401).send('Unauthorized request');
  }
}  //verifyToken ends here

app.post('/api/users', verifyToken, (req, res)=> {

  let name =  'Livingstone';
  console.log('users');
  res.send({ result: name});
  return;
});






