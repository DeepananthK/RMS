import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './commonStyle.css';

function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [cookie,setCookie]=useCookies(['username']);
    async function loginUser(event) {
        event.preventDefault();
        const response=await fetch('http://localhost:1337/login',{
            method: 'POST',
            headers: {
                'content-Type':'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
        const data=await response.json();
        if(data.user) {
            console.log(cookie.username);
            if(data.role==='admin') {
                window.location.href='/adminDashboard';
            } else if(data.role==='user') {
                window.location.href='/user';
                setCookie('username',data.username);
            }
        } else {
            alert("Invalid Username or password");
        }
    }
    return (
        <div align="center" className='container1' style={{color:'white'}}>
            <div>
                <h1>Log in</h1>
                <form onSubmit={loginUser}>
                    <h4>Username:</h4> <input type="email" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <br />
                    <h4>Password:</h4> <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <br />
                    <br />
                    <input type="submit" value="Login" className='button-18'/>
                </form>
                <h4>New User? Sign Up <Link to="/signup" style={{color:'orange'}}>here</Link></h4>
            </div>
        </div>
    );
}

export default Login;