const mongoose = require("mongoose");

const non_avail=new mongoose.Schema({
    resourceId: {type: String,required:true},
    fromDate: {type:String,required:true},
    toDate: {type:String,required:true},
},
{collection: 'non-availablity-data'}
);

const model=mongoose.model('non-availability',non_avail);

module.exports=model;