const mongoose = require("mongoose");

const Booking=new mongoose.Schema({
    bookingId: {type: String,required:true,unique:true},
    resourceId: {type: String,required:true},
    username: {type: String, required:true},
    reason: {type: String, required:true},
    date: {type:String,required:true},
},
{collection: 'booking-data'}
);

const model=mongoose.model('BookingData',Booking);

module.exports=model;