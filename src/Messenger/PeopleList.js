import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PeopleList(props){
    const {id} = useParams();
    //console.log(id);
    const [selectclass, setSelectclass]= useState('bg-white');
    //const [data,setData] = useState([1,2,3]);
    const [item,setItem]=useState();
    const token = localStorage.getItem('Token');
    const[people,setPeople]= useState([]);
    const clickedUser=(x)=>{
        props.select(x);
    }
    useEffect(()=>{
        axios.post('http://localhost:8000/getpeople',{token}).then((res)=>{
            setPeople(res.data);
            //console.log(res.data);
        })
    },[])
    //console.log(people);
    return (
        <div>
            { people.map(x=>
                <div key={x._id} onClick={()=>{clickedUser(x)}} className={`${x._id==id? selectclass : '' } bg-blue-600 p-2 hover:bg-red-200 hover:scale-105 cursor-pointer`}>{x.email}</div>
                )
            }
        </div>
    )
}

export default PeopleList;