import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { UserIdContext } from "../Context/UserIdContext";


const ProtetedAdmin = ({children})=>{
    const token = localStorage.getItem("Token");
    const [user, setUser] = useContext(UserContext)
    const [userid, setUserid] = useContext(UserIdContext)
    const [check, setCheck] =useState(true);
    
    useEffect(()=>{
        axios.post('http://localhost:8000/checkauth',{token}).then((res)=>{
            setCheck(false);
            setUser(res.data.role)
            setUserid(res.data.id);
            console.log(res.data);
          })
    },[user,token]);
    if(check)
    {
        return(<div>Loading...</div>)
    }
    else if(!check && user==="admin")
    {
        return children;
        
    }
    else return <Navigate to='/login' replace/>

}
export default ProtetedAdmin;