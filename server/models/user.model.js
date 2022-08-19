const mongoose = require("mongoose");

const User=new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true, unique:true},
    role: {type: String,default:'user'},
    password: {type: String, required:true},
},
{collection: 'user-data'}
);

const model=mongoose.model('UserData',User);

module.exports=model;