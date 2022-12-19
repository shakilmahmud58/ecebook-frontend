import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Messagebox from './MessageBox';
import Messages from './Messages';
import PeopleList from './PeopleList';

function Messenger(props) {
  const socket = io('http://localhost:8000');
  const params = useParams()
  const navi = useNavigate()
  const [userid, setUserid]= useState();
  //console.log(params.id); 
    const clicked=()=>{
    }
  const selectUser = (userId)=>{
      setUserid(userId);
      navi(`/messenger/${userId._id}`)
      //props.history.push()
    }
    //console.log(params.id);
    useEffect(()=>{
      if(params.id)
        axios.post('http://localhost:8000/getreceiver',{id:params.id}).then((res)=>{
        //console.log(res.data);
        setUserid(res.data)
      });
      //console.log(params.id);
    },[]);
  
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 col-lg-3 bg-secondary">
            <div>People List</div>
            <PeopleList select= {selectUser}></PeopleList>
          </div>
          <div className="col-8 col-lg-9">
            <Messages userid={userid}></Messages>
            <Messagebox userid={userid}></Messagebox>
          </div>
        </div>
      Messenger
      </div>
    );
  }
  
  export default Messenger;