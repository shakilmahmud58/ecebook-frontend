import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


function Student() {
const params = useParams();
const [x, setx]=useState('');
useEffect(()=>{
  axios.get('http://localhost:8000').then(res=>{
    setx(res.data);
  })
})
  return (
    <div className="">
    This is the student page.
    { params.id }
    {x}
    </div>
  );
}

export default Student;
