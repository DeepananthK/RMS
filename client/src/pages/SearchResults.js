import React from "react";
import {Link} from 'react-router-dom';
import { useCookies } from "react-cookie";
import './commonStyle.css';

function SearchResults(props) {
    const resources=props.Resource;
    const [cookie,setCookie]=useCookies(['resourceId','resourceName','resourceType','date']);
    console.log("props:",resources);
    function setResourceData(id,name,type) {
        setCookie('resourceId',id);
        setCookie('resourceName',name);
        setCookie('resourceType',type);
        setCookie('date',props.Date);
    }
    if(resources.length>0) {
        return (
            <>
                {
                    resources.map((value,index) => {
                        return (
                            <Link to="/user/search/book" onClick={() => setResourceData(value.resourceId,value.name,value.type)} key={index}>
                                <div className="resource-list">
                                    <h2>Resource Id:{value.resourceId}</h2>
                                    <h2>Resource Name: {value.name}</h2>
                                    <h2>Location: {value.location}</h2>
                                </div>
                            </Link>
                        )
                    })
                }
            </>
        )  
    } else {
        return <h1 style={{color:'white',margin:'1%'}}>No results found!</h1>
    }
}

export default SearchResults;