import axios from "axios";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const ProtetedRoute = ({children})=>{
    const [user, setUser] = useContext(UserContext)
    const token = localStorage.getItem("Token");
    // axios.post('http://localhost:8000/checkauth',{token}).then((res)=>{
    //     setUser(res.data.role);
    //     console.log(res.data.role);
    //   })
    // const data = axios.post('http://localhost:8000/checkauth',{token});
    //   console.log(data);
    if(user=="student")
    {
        return children;
    }
    return <Navigate to='/login' replace/>
    

}
export default ProtetedRoute;