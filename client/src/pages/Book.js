import React, { useState } from "react";
import { useCookies } from "react-cookie";
import './commonStyle.css';

function Book() {
    const [cookie,setCookie,removeCookie]=useCookies(['username','resourceId','resourceName','resourceType','date']);
    const [reason,setReason]=useState("");
    const username=cookie.username;
    const resourceId=cookie.resourceId;
    const date=cookie.date;
    async function bookResource(event) {
        event.preventDefault();
        removeCookie("resourceId");
        removeCookie("resourceName");
        removeCookie("resourceType");
        removeCookie("date");
        console.log("Sending");
        const response=await fetch('http://localhost:1337/user/search/book',{
            method: 'POST',
            headers: {
                'content-Type':'application/json',
            },
            body: JSON.stringify({
                username,
                reason,
                date,
                resourceId,
            }),
        })
        const data=await response.json();
        if(data.status) {
            alert("Request sent to admin");
            window.location.href='/user';
        } else {
            alert("Cannot update");
        }
    }
    return (
        <div align="center" className='container3' style={{color:'white'}}>
            <div>
                <h1>Book</h1>
                <form onSubmit={bookResource}>
                    <h5>Username:</h5> <input type="email" value={cookie.username} readOnly required/>
                    <br />
                    <h5>Resource Id:</h5> <input type="text" value={cookie.resourceId} readOnly required/>
                    <br />
                    <h5>Resource Name:</h5> <input type="text" value={cookie.resourceName} readOnly required/>
                    <br />
                    <h5>Resource Type:</h5> <input type="text" value={cookie.resourceType} readOnly required/>
                    <br />
                    <h5>Date:</h5> <input type="date" value={cookie.date} readOnly required/>
                    <h5>Reason:</h5> <input type="text" onChange={(e) => {setReason(e.target.value)}} />
                    <br />
                    <br />
                    <input type="submit" value="Book Resource" className='button-18'/>
                </form>
            </div>
        </div>
    );
}

export default Book;