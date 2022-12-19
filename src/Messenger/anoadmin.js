import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client"
function Anoadmin(){
    const socket = io('http://localhost:8000');
    const [name, setName]= useState("");
    const [text, setText]= useState("");
    const [check, setCheck]= useState(true);
    const [token,setToken] = useState(localStorage.getItem("anotoken"));
    const [allmsg,setAllmsg]= useState([]);
    //const [time,settime] = useState('');
    const changename=(e)=>{
        setName(e.target.value);
    }
    const changeText=(e)=>{
        setText(e.target.value);
    }
    const submitmsg=(e)=>{
        e.preventDefault();
        var time= undefined;
        if(!token)
        {
            time=Date.now();
        }
        socket.emit("sendanomsg",{name, text, token, time});
        axios.post("http://localhost:8000/sendanomsg",{name, text, token, time}).then((res)=>{
            if(res.data.token)
            {
                localStorage.setItem("anotoken",res.data.token);
                setToken(res.data.token);
            }
            else
            {
                console.log(res.data.result);
                allmsg.push(res.data.result);
            }
           // console.log(res.data);
            setText('');
            setName('');
        })
    }
    useEffect(()=>{
        axios.post('http://localhost:8000/getanomsg',{token}).then((res)=>{
            if(res.data.token)
            {
                setToken(res.data.token);
                setAllmsg(res.data.msgs);

            }
            else
            {
                localStorage.removeItem('anotoken')
            }
            
            setCheck(false);
        });
    },[]
    )
    if(check)
    {
        return (<div>Loading...</div>)
    }
    else if(!token && !check) return(
        <div>
            <div>Insert your Name</div>
            <input type="text"className="form-control" value={name} onChange={(e)=>changename(e)}/>
            <div>Insert your Text</div>
            <input type="text" className="form-control" value={text} onChange={(e)=>changeText(e)}/>
            <div><button className="btn bg-yellow-500" onClick={(e)=>submitmsg(e)}>Send</button></div>
        </div>
    )
    else return(
        <div>
            { allmsg.map((data)=><div key={data._id}>{data.text}</div>)}
            
            <div>Insert your Text</div>
            <input type="text" className="form-control" value={text} onChange={(e)=>changeText(e)}/>
            <div><button className="btn bg-yellow-500" onClick={(e)=>submitmsg(e)}>Send</button></div>
        </div>
    )
}

export default Anoadmin;