import { useContext } from "react";
import { UserIdContext } from "../Context/UserIdContext";

function Notice() {
  const [id,setId]=useContext(UserIdContext);
  //}
  return (
    <div className="">
    This is the notice board {id}
    </div>
  );
}

export default Notice;
