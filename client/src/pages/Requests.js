import React, { useState } from "react";
import {useEffect} from 'react';
import {Link} from 'react-router-dom';

function PendingRequests(props) {
    async function acceptBooking(id) {
        const response=await fetch('http://localhost:1337/admin/requests/accept',{
            method: 'POST',
            headers: {
                'content-Type':'application/json',
            },
            body: JSON.stringify({
                id,
            }),
        })
        const data=await response.json();
        if(data.status==='exists') {
            alert("Already booked");
        }
        else if(data.status==='true') {
            alert("Accepted Booking");
        } else {
            alert("Cannot update");
        }
        window.location.href='/admin/requests';
    }
    async function denyBooking(id) {
        const response=await fetch('http://localhost:1337/admin/requests/deny',{
            method: 'POST',
            headers: {
                'content-Type':'application/json',
            },
            body: JSON.stringify({
                id,
            }),
        })
        const data=await response.json();
        if(data.status) {
            alert("Denied Booking");
        } else {
            alert("Cannot update");
        }
        window.location.href='/admin/requests';
    }
    const requests=props.pending;
    return (
        <>
            {
                requests.map((value,index) => {
                    return (
                        <div className="resource-list">
                            <h2>Resource Id:{value.resourceId}</h2>
                            <h2>UserName: {value.username}</h2>
                            <h2>Date: {value.date}</h2>
                            <h2>Reason: {value.reason}</h2>
                            <div align="center">
                                <button className="button-18" style={{marginRight:'2%',marginLeft:'2%'}} onClick={() => acceptBooking(value.bookingId)}>Accept</button>
                                <button className="button-18" onClick={() => denyBooking(value.bookingId)}>Deny</button>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )  
}

function Requests() {
    const [requests,setRequests]=useState("");

    useEffect(()=>{getRequests()},[]);
    async function getRequests() {
        const response=await fetch('http://localhost:1337/admin/requests',{
            method: 'POST',
            headers: {
                'content-Type':'application/json',
            },
            body: JSON.stringify({
            }),
        })
        const data=await response.json();
        setRequests(data);
        console.log(requests);
    }

    return (
        <>
            <div align="center" style={{color:'white'}}>
                <div>
                    <h1>Requests From Users</h1>
                </div>
            </div>
            {requests.length>0 && <PendingRequests pending={requests}/> }
            {requests.length===0 && <h1 style={{color:'white'}}>No Pending Requests</h1> }
            <h1 style={{fontSize:'250%'}} align="center"><u><Link to="/adminDashboard" style={{color:'white'}}>Go to Dashboard</Link></u></h1>
        </>
    )
}
export default Requests;