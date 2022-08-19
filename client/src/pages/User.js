import './commonStyle.css';
import React, { useEffect } from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function User() {
    const [cookie,setCookie,removeCookie]=useCookies('username');
    const [count,setCount]=useState('');
    //console.log("User:"+cookie.username);
    const email=cookie.username;
    console.log(email);
    useEffect(()=>{getCount()},[]);
    async function getCount() {
        const response=await fetch('http://localhost:1337/user',{
            method: 'POST',
            headers: {
                'content-Type':'application/json',
            },
            body: JSON.stringify({
                email,
            }),
        })
        const data=await response.json();
        /*console.log(data);
        console.log(data.count);*/
        setCount(data.count);
    }
    return (
        <>
            <h1 align="right"><Link to='/login' style={{color:'white'}} onClick={()=>removeCookie('username')}><u>Logout</u></Link></h1>
            <div className="container4">
                <div className="container2 font-prop">
                    <div>
                        <div className="font-prop2"><Link to="/user/myBookings">My Bookings</Link></div>
                        <div>You have {count} bookings!</div>
                    </div>
                </div>
                <div className="container2 font-prop">
                    <div className="font-prop2"><Link to="/user/search">Book Now</Link></div>
                </div>
            </div>
        </>
    );
}

export default User;