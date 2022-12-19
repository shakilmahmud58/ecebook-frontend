import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


function Student() {
const navigate = useNavigate();
const params = useParams();
const [students, setstudents]=useState([]);
const gotomessenger= (student)=>{
    navigate(`/messenger/${student._id}`,{state:{student}});
}
useEffect(()=>{
  axios.post('http://localhost:8000/getstudents',{year:params.id}).then(res=>{
    setstudents(res.data);
    console.log(res.data);
  })
},[params.id])
  return (
    <div className="">
    This is the student page.
    { students.map(student=>
    <div key={student._id} className="m-2">{student.email}<button onClick={()=>gotomessenger(student)} className="btn btn-primary">Message</button></div>
    )}
      
    </div>
  );
}

export default Student;
