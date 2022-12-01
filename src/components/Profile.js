import {useParams} from 'react-router-dom';
function Profile() {
    const {id} = useParams();
    console.log(useParams());
    return (
      <div className="">

      This is the Profile Page{id}
      </div>
    );
  }
  
  export default Profile;
  