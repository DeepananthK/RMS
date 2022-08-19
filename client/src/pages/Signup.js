import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './commonStyle.css';

function Signup() {
    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [cookie,setCookie]=useCookies(['username']);
    async function registerUser(event) {
        event.preventDefault();
        const response=await fetch('http://localhost:1337/signup',{
            method: 'POST',
            headers: {
                'content-Type':'application/json',
            },
            body: JSON.stringify({
                email,
                name,
                password,
            }),
        })
        const data=await response.json();
        console.log(data);
        if(data.user) {
            setCookie('username',data.username);
            window.location.href='/user';
        } else {
            alert("Username Already Exists");
        }
    }
    return (
        <div align="center" className='container1' style={{color:'white'}}>
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={registerUser}>
                    <h4>Username:</h4> <input type="email" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <br />
                    <h4>Name:</h4> <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                    <br />
                    <h4>Password:</h4> <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <br />
                    <br />
                    <input type="submit" value="SignUp" className='button-18'/>
                </form>
                <h4>Click <Link to="/login" style={{color:'orange'}}>here</Link> to Login</h4>
            </div>
        </div>
    );
}

export default Signup;