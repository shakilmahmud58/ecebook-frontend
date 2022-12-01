import { useContext, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import { UserContext } from "../Context/UserContext";

function Login(props) {
  const navigate = useNavigate();
  const [user, setUser]= useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const submitform=(e)=>{

        e.preventDefault();
        const data = {
            email,
            password
        }
        axios.post('http://localhost:8000/login',{data}).then((res)=>{
            if(res.data.token)
            {
              setUser(res.data.role);
              localStorage.setItem('Token',res.data.token);
              if(res.data.role==="student")
              {
                navigate(`/profile/${res.data.id}`);
              }
              else
              {
                navigate('/addadmin');
              }
              
            }
            else
            {
              setPassword('');
              setMessage(res.data.msg)
            }
        })
        
    }
    const changeEmail=(e)=>{
        setEmail(e.target.value);
        setMessage('');
    }
    const changePass=(e)=>{
      setPassword(e.target.value);
      setMessage('');
  }

    return (
      <div className="container">
        <div className="row">
<form className="col-6 mt-4" onSubmit={(e)=>submitform(e)}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Student Email address</label>
    <input type="email" onChange={ (e)=>changeEmail(e)} value={email} className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="pass" className="form-label">Password</label>
    <input type="text" className="form-control" value={password} id="pass" name="password" onChange={ (e)=>changePass(e)}/>
  </div>
  <div className="m-4 text-danger">{ message }</div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
</div>
<Link to='/profile/111'>Profile</Link>
      </div>
    );
  }
  
  export default Login;
  