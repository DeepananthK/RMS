const mongoose = require("mongoose");

const TempBooking=new mongoose.Schema({
    bookingId: {type: String,required:true,unique:true},
    resourceId: {type: String,required:true},
    username: {type: String, required:true},
    reason: {type: String, required:true},
    date: {type:String,required:true},
    pending: {type:String,default:'true'},
},
{collection: 'temp-booking-data'}
);

const model=mongoose.model('TempBookingData',TempBooking);

module.exports=model;