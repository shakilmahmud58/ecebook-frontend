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
import { useEffect, useState } from 'react';
import ProtetedAdmin from './Auth/ProtectedAdmin';
import Addadmin from './components/Admin/Addadmin';
import axios from 'axios';
function App() {
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const [islogin,setislogin] = useState();
  useEffect(()=>{
    axios.post('http://localhost:8000/checkauth',{token}).then((res)=>{
        setislogin(res.data.role);
   })
  },[islogin])
  return (<div className="App">{islogin ? 
    (<div>
    <UserContext.Provider value={[islogin,setislogin]}> 
  <BrowserRouter>
  <Header></Header>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/student/:id" element={<Student />} />
    <Route path="/notices" element={<Notice />} />
    
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/confirm/:token" element={<Login />} />
    <Route path="/faculty_member" element={<ProtetedRoute><Faculty /></ProtetedRoute>} />
    <Route path="/profile/:id" element={<ProtetedRoute><Profile /></ProtetedRoute>} />
    <Route path="/addadmin" element={<ProtetedAdmin><Addadmin/></ProtetedAdmin>} />
    </Routes>
    </BrowserRouter>
    </UserContext.Provider> 
    </div>):(<div>Loading..<button onClick={setislogin("admin")}>Change</button></div>)}</div>
  );
 }

export default App;
