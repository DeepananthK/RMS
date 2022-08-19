import { useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import './commonStyle.css'

function Admin() {
    return (
        <>
            <h1 align="right"><Link to='/login' style={{color:'white'}}><u>Logout</u></Link></h1>
            <div className="container4">
                <div className="container2 font-prop">
                    <div className="font-prop2"><Link to="/admin/requests">View Requests</Link></div>
                </div>
                <div className="container2 font-prop">
                    <div className="font-prop2"><Link to="/admin/addResources">Add New Resources</Link></div>
                </div>
                <div className="container2 font-prop">
                    <div className="font-prop2"><Link to="/admin/restrictResources">Lock Resources</Link></div>
                </div>
            </div>
        </>
    )
}

export default Admin;