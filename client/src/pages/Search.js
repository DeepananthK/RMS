import React, { useState } from "react";
import SearchResults from "./SearchResults";
import {Link} from 'react-router-dom';
import './commonStyle.css';

function Search() {
    const [date,setDate]=useState("");
    const [type,setType]=useState("");
    const [resourceFlag,setResourceFlag] = useState("") ;
    const [resources,setResources]=useState("");
    async function getResources(event) {
        console.log(date);
        console.log(type);
        setResourceFlag(false);
        event.preventDefault();
        const response=await fetch('http://localhost:1337/user/search',{
            method: 'POST',
            headers: {
                'content-Type':'application/json',
            },
            body: JSON.stringify({
                date,
                type,
            }),
        })
        const data=await response.json();
        if(data) {
            console.log("Found");
            console.log(data);
            setResources(data);
            setResourceFlag(true);
        } else {
            alert("Error");
        }
    }

    return (
        <>
            <div align="center" style={{color:'white'}}>
                <div>
                    <div>
                        <h1>Resource Management system</h1>
                        <h1 style={{fontSize:'200%'}} align="right"><u><Link to="/user" style={{color:'white'}}>Go to Dashboard</Link></u></h1>
                        <form onSubmit={getResources}>
                            <div style={{display:'inline'}}>
                                <div style={{display:'inline',margin:'3%'}}>
                                    <h4 style={{display:'inline'}}>Date:</h4><input type="date" onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} required/>
                                </div>
                                <div style={{display:'inline',margin:'3%'}}>
                                    <h4 style={{display:'inline'}}>Type:</h4>
                                    <select onChange={(e) => setType(e.target.value)} defaultValue={'Select an Option'} required>
                                        <option value="Select an Option" disabled hidden>Select an Option</option>
                                        <option value="Seminar Hall">Seminar Hall</option>
                                        <option value="Laboratory">Laboratory</option>
                                        <option value="Lecture Hall">Lecture Hall</option>
                                        <option value="Auditorium">Auditorium</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{margin:'1%'}}>
                                <input type='submit' value="Search" className='button-18' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {resourceFlag && <SearchResults Resource={resources} Date={date}/> }
        </>
    )
}

export default Search;