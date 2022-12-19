import './App.css';
//import { render } from "react-dom";
import { BrowserRouter,Routes, Route} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Student from './components/Student';
import Faculty from './components/Faculty';
import Notice from './components/Notice';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import ProtetedRoute from './Auth/ProtectedRoute';
import { UserContext } from './Context/UserContext';
import { UserIdContext } from './Context/UserIdContext';
import { useEffect, useState } from 'react';
import ProtetedAdmin from './Auth/ProtectedAdmin';
import Addadmin from './components/Admin/Addadmin';
import Messenger from './Messenger/Messenger';
import axios from 'axios';
import Anomsg from './Messenger/anomsg';
import Anoadmin from './Messenger/anoadmin';
function App() {
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const [islogin,setislogin] = useState();
  const [check,setCheck] = useState(true);
  const [id,setId] = useState();
  useEffect(()=>{
  axios.post('http://localhost:8000/checkauth',{token}).then((res)=>{
      setislogin(res.data.role);
      setCheck(false)
      setId(res.data.id);
      //console.log(res.data);
   })
  },[check])
  if(check) return(<div>Loading...</div>)
  else return (
  <div className="App">
    <UserIdContext.Provider value={[id,setId]}>
    <UserContext.Provider value={[islogin,setislogin]}> 
  <BrowserRouter>
  <Header></Header>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/student/:id" element={<Student />} />
    
    
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/confirm/:token" element={<Login />} />
    <Route path="/faculty_member" element={<Faculty />} />
    <Route path="/live_msg" element={<Anomsg />} />
    <Route path="/admin_msg" element={<Anoadmin />} />
    <Route path="/notices" element={<ProtetedRoute><Notice /></ProtetedRoute>} />
    <Route path="/messenger" element={<ProtetedRoute><Messenger /></ProtetedRoute>} />
    <Route path="/messenger/:id" element={<ProtetedRoute><Messenger /></ProtetedRoute>} />
    <Route path="/profile/:id" element={<ProtetedRoute><Profile /></ProtetedRoute>} />
    <Route path="/addadmin" element={<ProtetedAdmin><Addadmin/></ProtetedAdmin>} />
    </Routes>
    </BrowserRouter>
    </UserContext.Provider> 
    </UserIdContext.Provider>
    </div>
    );
 }

export default App;
