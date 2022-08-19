import { useState } from 'react';
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

function LockResources() {
    //let flag=true;
    const [resources,setResources]=useState("");
    const [resourceID,setResourceId]=useState("");
    const [fromDate,setFromDate]=useState("");
    const [toDate,setToDate]=useState("");
    useEffect(()=>{getResources()},[]);
    async function getResources() {
        const response=await fetch('http://localhost:1337/admin/resources',{
            method: 'POST',
            headers: {
                'content-Type':'application/json',
            },
            body: JSON.stringify({
            }),
        })
        const data=await response.json();
        setResources(data);
    }
    async function lockResources() {
        if(fromDate>toDate) {
            alert("To Date should be greater than From date");
            return ;
        }
        const response=await fetch('http://localhost:1337/admin/lockResource',{
            method: 'POST',
            headers: {
                'content-Type':'application/json',
            },
            body: JSON.stringify({
                resourceID,
                fromDate,
                toDate,
            }),
        })
        const data=await response.json();
        console.log("Data:",data);
        if(data.status) {
            alert("Updated");
        } else {
            alert("Cannot Update");
        }
    }
    return (
        <>
            <div align="center" className='container1' style={{color:'white'}}>
                <div>
                    <h1>Lock a Resource</h1>
                    <form onSubmit={lockResources}>
                        <select onChange={(e) => setResourceId(e.target.value)} defaultValue={'Select an Option'} required>
                            <option value="Select an Option" disabled>Select an Option</option>
                        {resources && 
                                        resources.map((value,index) => {
                                            return (
                                                <option value={value.resourceId} key={index}>{value.name}</option>
                                            )
                                        })
                        }
                        </select>
                        <br />
                        <h4>From Date:</h4> <input type="date" onChange={(e) => setFromDate(e.target.value)} min={new Date().toISOString().split('T')[0]} required/>
                        <br />
                        <h4>To Date:</h4> <input type="date" onChange={(e) => setToDate(e.target.value)} min={new Date().toISOString().split('T')[0]} required/>
                        <br />
                        <br />
                        <input type="submit" value="Lock" className='button-18'/>
                    </form>
                    <h1 style={{fontSize:'250%'}}><u><Link to="/adminDashboard" style={{color:'white'}}>Go to Dashboard</Link></u></h1>
                </div>
            </div>
        </>
    )
}

export default LockResources;