const express = require("express");
const app = express();

const cors = require("cors");
const User = require("./models/user.model");
const Resource = require("./models/resource.model");
const Booking = require("./models/booking.model");
const NonAvail = require("./models/non-availability.model");
const TempBooking =require("./models/tempBooking.model");
const { default: mongoose } = require("mongoose");
const NodeMailer=require('nodemailer');

mongoose.connect('mongodb://localhost:27017/resource-management-system');
app.use(cors());
app.use(express.json());

app.post('/signup', async (req,res) => {
    console.log(req.body);
    try {
        const user=await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({status:'ok',username:user.email,role:user.role,user:true})
    } catch(error) {
        console.log(error);
        res.json({status:'error', error:'Duplicate email',user:false});
    }
})

app.post('/login', async (req,res) => {
    console.log(req.body);
    const user=await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    if(user) {
        res.json({status:'ok',username:user.email,role:user.role,user:true});
    } else {
        res.json({status:'error',user:false});
    }
})

app.post('/user', async (req,res) => {
    console.log("req:"+req.body.email);
    const bookings=await Booking.find({
        username: req.body.email,
    })
    console.log(bookings.length);
    res.json({count:bookings.length});
})

app.post('/user/search', async (req,res) => {
    console.log("req:",req.body.type,req.body.date);
    //toDate:{$lte:new Date(req.body.date)}
    /*const unavailableRes=await NonAvail.find({
        $and: [{fromDate:{$lte:ISODate(req.body.date)}},{toDate:{$gte:ISODate(req.body.date)}}]
    })*/
    //const unavailableRes=await NonAvail.where("fromDate").gte(req.body.date).where("toDate").lte(req.body.date);
    const unavailableRes=await NonAvail.find({
    });
    //console.log("Unavail:",unavailableRes);
    const resIds1=unavailableRes.map((item) => {
        if(new Date(item.fromDate)<=new Date(req.body.date) && new Date(item.toDate)>=new Date(req.body.date))
        {
            //console.log("Hello");
            return item.resourceId;
        }
        //return item.resourceId;
    });
    //console.log("UnavailRes:",resIds);
    const bookedResources=await Booking.find({
    });
    console.log(bookedResources);
    var resIds2=bookedResources.map((item) => {
        console.log(item.date,"::",req.body.date);
        if(item.date === req.body.date)
        {
            return item.resourceId;
        }
    });
    console.log(resIds2);
    const resIds=resIds1.concat(resIds2);
    const resources=await Resource.find({
        resourceId:{$nin:resIds},
        type:req.body.type
    });
    //console.log(resources);
    res.send(resources);
})

app.post('/login', async (req,res) => {
    console.log(req.body);
    const user=await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    if(user) {
        res.json({status:'ok',username:user.email,role:user.role,user:true});
    } else {
        res.json({status:'error',User:false});
    }
})

app.post('/user', async (req,res) => {
    console.log("req:"+req.body.email);
    const bookings=await Booking.find({
        username: req.body.email,
    })
    console.log(bookings.length);
    res.json({count:bookings.length});
})

app.post('/user/myBookings', async (req,res) => {
    console.log("req for bookings:"+req.body.username);
    const bookings=await Booking.find({
        username: req.body.username,
    })
    res.json({bookings: bookings});
})

app.post('/user/search/book', async (req,res) => {
    console.log("req:",req.body);
    try {
        const bookings=await TempBooking.find({

        });
        const bookingCount=bookings.length+1;
        const bookingId="B"+bookingCount;
        const booking=await TempBooking.create({
            bookingId: bookingId,
            resourceId: req.body.resourceId,
            username: req.body.username,
            reason: req.body.reason,
            date: req.body.date,
        })
        console.log("Ok");
        res.json({status:true});
    } catch (error) {
        //console.log(error);
        res.json({status:false});
    }
})

app.post('/admin/resources',async (req,res) => {
    const resources=await Resource.find({
    })
    //console.log(resources);
    res.send(resources);
})

app.post('/admin/requests',async (req,res) => {
    const requests=await TempBooking.find({
        pending: 'true',
    })
    //console.log(requests);
    res.send(requests);
})

app.post('/admin/requests/accept',async (req,res) => {
    try {
        const bookingDetails=await TempBooking.find({
            bookingId: req.body.id,
        });
        console.log(bookingDetails);
        const exists=await Booking.find({
            resourceId: bookingDetails[0].resourceId,
            date: bookingDetails[0].date,
        });
        console.log(exists);
        console.log(exists.length);
        if(exists.length>0) {
            var myquery = { bookingId: req.body.id };
            var newvalues = { $set: {pending: 'false'} };
            const requests=await TempBooking.updateOne(myquery,newvalues);
            res.json({status:'exists'});
        }
        else {
            const bookings=await Booking.find({
            });
            const bookingCount=bookings.length+1;
            console.log(bookingCount);
            const bookingId="B"+bookingCount;
            const booking=await Booking.create({
                bookingId: bookingId,
                resourceId: bookingDetails[0].resourceId,
                username: bookingDetails[0].username,
                reason: bookingDetails[0].reason,
                date: bookingDetails[0].date,
            });
            var myquery = { bookingId: req.body.id };
            var newvalues = { $set: {pending: 'false'} };
            const requests=await TempBooking.updateOne(myquery,newvalues);
            res.json({status:'true'});
            /*const email=bookingDetails.username;
            const transporter=NodeMailer.createTransport({
                service: "gmail",
                auth: {
                    user: "*********************",
                    pass: '******',
                }
            })
            const mailOptions={
                from: '******',
                to: email,
                subject: 'Accepted',
                text: 'Your request for booking is accepted. Check ur dashboard for details'
            }
            transporter.sendMail(mailOptions,(error,info)=>{
                if(error) {
                    console.log(error);
                } else {
                    console.log("Email sent:",info.response);
                }
            })*/
        }
    } catch(error) {
        console.log(error);
        res.json({status:'false'});
    }
})

app.post('/admin/requests/deny',async (req,res) => {
    try {
        var myquery = { bookingId: req.body.id };
        var newvalues = { $set: {pending: 'false'} };
        const requests=await TempBooking.updateOne(myquery,newvalues);
        res.json({status:true});
    } catch(error) {
        res.json({status:false});
    }
})

app.post('/admin/lockResource',async (req,res) => {
    console.log(req.body);
    const result=await NonAvail.findOne({
        fromDate:req.body.fromDate,
        resourceId:req.body.resourceID,
        toDate:req.body.toDate,
    });
    console.log(result);
    if(result) {
        console.log("Exists");
        res.json({status:'error'})
    } else {
        try {
            await NonAvail.create({
                fromDate:req.body.fromDate,
                resourceId:req.body.resourceID,
                toDate:req.body.toDate,
            });
            console.log("ok");
            res.json({status:true});
        } catch(error) {
            res.json({status:false});
        }
    }
})

app.post('/admin/addResource', async (req,res) => {
    console.log("req:",req.body);
    try {
        const resources=await Resource.find({

        });
        const resourcesCount=resources.length+1;
        const resourceId="R"+resourcesCount;
        const newResource=await Resource.create({
            resourceId: resourceId,
            location: req.body.location,
            name: req.body.name,
            type: req.body.type
        })
        console.log("Ok");
        res.json({status:true});
    } catch (error) {
        //console.log(error);
        res.json({status:false});
    }
})

app.listen(1337, ()=>{
    console.log("Server started on http://localhost:1337")
})