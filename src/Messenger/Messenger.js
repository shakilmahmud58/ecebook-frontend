import io from 'socket.io-client';

function Messenger() {
    const socket = io('http://localhost:8000');
    socket.on("send",(data)=>{
      console.log(data);
    })
    
    const clicked=()=>{
        
    }
    return (
      <div className="">
      Messenger
      <button onClick={clicked}>Click me</button>
      </div>
    );
  }
  
  export default Messenger;