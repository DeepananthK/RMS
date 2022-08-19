import React from "react";
import {Link} from 'react-router-dom';
import './welcome.css';

function Welcome() {
    return (
        <>
            <div className="container1">
                <div>
                    <div className="heading">Resource Management System</div>
                    <div className="center" style={{margin:'2%'}}>
                        <br />
                        <br />
                        <button className="button-18"><Link to="/login">Login</Link></button>
                        <button className="button-18"><Link to="/signup">SignUp</Link></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Welcome;