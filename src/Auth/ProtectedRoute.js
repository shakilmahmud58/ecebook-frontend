import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { UserIdContext } from "../Context/UserIdContext";

const ProtetedRoute = ({children})=>{
    const token = localStorage.getItem("Token");
    const [user, setUser] = useContext(UserContext)
    const [userid, setUserid]= useContext(UserIdContext);
    const [check, setCheck] =useState(true);
    
    useEffect(()=>{
        axios.post('http://localhost:8000/checkauth',{token}).then((res)=>{
           setUser(res.data.role);
           setCheck(false)
           setUserid(res.data.id);
           console.log(res.data);
        })
    },[user,token])
 
    if(check)
    {
        return <div>Loading...</div>
    }
    else if(user=="student" && !check)
    {
        return children;
    }
    else return <Navigate to='/login' replace/>
    

}
export default ProtetedRoute;