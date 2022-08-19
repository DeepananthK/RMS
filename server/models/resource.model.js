const mongoose = require("mongoose");

const Resource=new mongoose.Schema({
    resourceId: {type: String,required: true, unique:true},
    name: {type: String, required:true,unique: true},
    type: {type: String, required:true},
    location: {type: String, required:true},
    availability: {type: String, default:'available'},
},
{collection: 'resource-data'}
);

const model=mongoose.model('ResourceData',Resource);

module.exports=model;