const mongoose = require('mongoose');
const express = require('express');
const app = express();
const schema = mongoose.Schema;


console.log('hi');
const userSchema = new schema({
    fname: String,
    lname: String,
    email: String,
    pwd: String
});

module.exports = mongoose.model('user', userSchema, 'users');
const db = "mongodb+srv://livingstone_it:root@cluster0-gigea.mongodb.net/angkart?retryWrites=true&w=majority";

mongoose.connect(db, err => {
    if(err)
    {
        console.log('error'+err);
    }
    else
    {
        console.log('connected to mongoose');
        app.listen(3002, ()=> {
            console.log('Connection running');
        });
    }
})