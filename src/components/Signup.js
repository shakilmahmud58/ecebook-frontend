import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Signup() {
    const [roll, setRoll]= useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const submitform=(e)=>{
        e.preventDefault();
        setMessage("Loading...")
        setEmail(email.trim());
        if(email.length===26)
        {
            const id = email.slice(0,7);
            const ruet = email.slice(15,26);
            //console.log(ruet);
            if(roll === id && ruet === ".ruet.ac.bd")
            {
                axios.post('http://localhost:8000/signup',{id,email,password}).then((result)=>{
                  setMessage(result.data.msg); 
                  console.log(result.data.msg);
                })
               
            }
            else
            {
                setMessage("don't match the roll number")
            }
            setRoll(0);
            setEmail('');
        }
        else
        {
            setMessage("Wrong email,Please try again with your student email");
            setEmail('');
        }
        
    }
    const changeRoll=(e)=>{
        setRoll(e.target.value);
        setMessage('');
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
    <label htmlFor="roll" className="form-label">Full Roll</label>
    <input type="number" className="form-control" value={roll} id="roll" name="roll" onChange={ (e)=>changeRoll(e)}/>
  </div>
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
<Link to="/login">Login</Link>
      </div>
    );
  }
  
  export default Signup;
  