import React, { useEffect } from "react";
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import {Link} from 'react-router-dom';

function Bookings(props){
    const bookingList=props.bookingList;
    console.log("Count:",bookingList.length);
    if(bookingList.length>0) {
        console.log("Hii");
        return (
            <>
                {
                    bookingList.map((value,index) => {
                        return (
                            <div className="resource-list" key={index}>
                                <h2>Resource Id:{value.resourceId}</h2>
                                <h2>Reason: {value.reason}</h2>
                                <h2>Date: {value.date}</h2>
                            </div>
                        );
                    })
                }
            </>
        )
    }
    else {
        <h1 style={{color:'white'}}>No Bookings</h1>
    }
}

function MyBookings() {
    const [cookie,setCookie]=useCookies('username');
    const [bookings,setBookings]=useState("");
    const username=cookie.username;
    useEffect(()=>{getBookings()},[]);
    async function getBookings() {
        console.log("Bookings request");
        const response=await fetch('http://localhost:1337/user/myBookings',{
            method: 'POST',
            headers: {
                'content-Type':'application/json',
            },
            body: JSON.stringify({
                username,
            }),
        })
        const data=await response.json();
        console.log(data.bookings);
        setBookings(data.bookings);
    }
    return (
        <>
            <h1 style={{fontSize:'200%'}} align="right"><u><Link to="/user" style={{color:'white'}}>Go to Dashboard</Link></u></h1>
            <div align="center" style={{color:'white'}}>
                <div>
                    <h1>My Bookings</h1>
                    {bookings.length>0 && <Bookings bookingList={bookings} />}
                    {bookings.length===0 && <h1>No bookings</h1>}
                </div>
            </div>
        </>
    )
}

export default MyBookings;