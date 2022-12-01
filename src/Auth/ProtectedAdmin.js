import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const ProtetedAdmin = ({children})=>{
    const [user, setUser] = useContext(UserContext)
    const [check, setCheck] =useState(true);
    const token = localStorage.getItem("Token");


    useEffect(()=>{
        axios.post('http://localhost:8000/checkauth',{token}).then((res)=>{
            setCheck(false);
            setUser(res.data.role)
            console.log(res.data);
          })
    },[check]);
    if(check)
    {
        return(<div>Loading...</div>)
    }
    else if(!check && user=="admin")
    {
        return children;
        
    }
    else return <Navigate to='/login' replace/>

//   return (<div>{ check ? (<div>Loading...</div>) : (<Navigate to='/login' replace/>)}</div>)

}
export default ProtetedAdmin;