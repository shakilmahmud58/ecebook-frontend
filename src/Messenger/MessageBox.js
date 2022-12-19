import axios from "axios";
import { useContext, useState } from "react";
import { UserIdContext } from "../Context/UserIdContext";
import io from 'socket.io-client'
function Messagebox(props){
    const socket = io('http://localhost:8000');

    const [currentUser, setCurrentUser]= useContext(UserIdContext)
    const [msg, setMsg]= useState('');
    const sendMsg = (e)=>{
        e.preventDefault();
        socket.emit('send',{from:currentUser, to:props.userid._id, text:msg});
        setMsg('');
        }
    const changeMsg =(e)=>{
        e.preventDefault();
        setMsg(e.target.value);
        }
    if(props.userid) return (
        <div className="mx-0 bg-gray-200 border border-b">
            <form className="row g-1" onSubmit={(e)=>{sendMsg(e)}}>
                
                <div className="col-md-11 col-9">
                    <input type="text" id="msg" name="msg" value={msg} onChange={(e)=>{changeMsg(e)}} className="form-control"/>
                </div>
                <div className="col-md-1 col-3"><button className="btn bg-blue-500" type="submit" onClick={ (e)=>{sendMsg(e)} } >{'>'}</button></div>
            
            </form>
        </div>
    )

}

export default Messagebox;