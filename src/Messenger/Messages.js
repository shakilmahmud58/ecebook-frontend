import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { UserIdContext } from "../Context/UserIdContext";
function Messages(props){
    const {id} = useParams();
    // console.log(id);
    // console.log(props.userid);
    const socket = io("http://localhost:8000")
    const [msgs, setMsgs] = useState([]);
    const [check,setCheck]=useState(true);
    const [user,setUser] = useContext(UserIdContext);
    socket.on('response',(msg)=>{
        msgs.push(msg);
        //console.log(msg);
    })
    useEffect(()=>{
        //setCheck(true);
        axios.post('http://localhost:8000/getusermsg',{to:id,user}).then((res)=>{
            setMsgs(res.data);
            setCheck(false);
            //console.log(res.data);
        })
    },[id,msgs])
    if(check)
    return (<div>Loading...</div>)
    else
    {
    if(id)
    return(
        <div>
            <div className="bg-hrey-200 border border-b">Messages of {id}</div>
            <div className="bg-hrey-200 border border-b h-48">
                {msgs.map((x)=>
                <div key={x._id}>
                     {x.text}
                </div>
                )}
            </div>
        </div>
    )
    else return (<div>Please select a user first</div>)
    }
}

export default Messages;