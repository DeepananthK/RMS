import React from "react";
import {useState} from 'react';
import {Link} from 'react-router-dom';

function AddResources() {
    const [name,setName]=useState("");
    const [type,setType]=useState("");
    const [location,setLocation]=useState("");

    async function addResource(event) {
        event.preventDefault();
        const response=await fetch('http://localhost:1337/admin/addResource',{
            method: 'POST',
            headers: {
                'content-Type':'application/json',
            },
            body: JSON.stringify({
                name,
                type,
                location,
            }),
        })
        const data=await response.json();
        console.log("Data:",data);
        if(data.status) {
            alert("Updated");
        } else {
            alert("Cannot Update");
        }
        window.location.href='/admin/addResources';
    }
    return (
        <>
            <div align="center" className='container3' style={{color:'white'}}>
                <div>
                    <h1>Add Resource</h1>
                    <form onSubmit={addResource}>
                        <h5>Resource Name:</h5> <input type="text" onChange={(e) => setName(e.target.value)} required/>
                        <br />
                        <h5>Resource Type:</h5>
                        <select onChange={(e) => setType(e.target.value)} defaultValue={'Select an Option'} required>
                            <option value="Select an Option" disabled hidden>Select an Option</option>
                            <option value="Seminar Hall">Seminar Hall</option>
                            <option value="Laboratory">Laboratory</option>
                            <option value="Lecture Hall">Lecture Hall</option>
                            <option value="Auditorium">Auditorium</option>
                        </select>
                        <br />
                        <h5>Location:</h5> <input type="text" onChange={(e) => setLocation(e.target.value)} required/>
                        <br />
                        <br />
                        <input type="submit" value="Add Resource" className='button-18'/>
                    </form>
                </div>
            </div>
            <h1 style={{fontSize:'250%'}} align="center"><u><Link to="/adminDashboard" style={{color:'white'}}>Go to Dashboard</Link></u></h1>
        </>
    )
}

export default AddResources;