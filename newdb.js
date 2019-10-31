const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
const PORT = 3004;
  
app.listen(PORT, () => {
    console.log('listening on '+PORT);
 });

// http://localhost:3002/
app.get('', (req, res)=> {
    res.send('Welcome to Express Server, running on port :'+PORT);
  });


app.get('/posts', (req, res)=> {

    let data = { 'token': '1234'};
    res.send({data});
});
  