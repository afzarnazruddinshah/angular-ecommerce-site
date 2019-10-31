const express = require('express');
const mongoose = require('mongoose');
const foodRouter = require('./routes/foodRoute.js');
const PORT = 3002;
const app = express();
app.use(express.json()); // To Make sure it comes back as json

const dburl = "mongodb+srv://livingstone_it:root@cluster0-gigea.mongodb.net/angkart?retryWrites=true&w=majority"

mongoose.connect(dburl, {
  useNewUrlParser: true
});

app.use(foodRouter);

app.listen(PORT, () => { console.log('Server is running on PORT:'+PORT) }); 

