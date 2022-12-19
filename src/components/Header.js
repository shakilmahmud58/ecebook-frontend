import { useContext } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "../Context/UserContext";
import { UserIdContext } from "../Context/UserIdContext";
function Header() {
  const [user,setUser]= useContext(UserContext);
  const [userid,setUserid]= useContext(UserIdContext);
  const logout=()=>{
    localStorage.removeItem("Token");
    setUser('');
    setUserid('');
  } 
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <Link className="navbar-brand" to="/">ECE</Link>
    {/* <div className="collapse navbar-collapse" id="navbarTogglerDemo03"> */}
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
        <Link to="/faculty_member" className="nav-link">Faculty</Link>
        </li>
        {/* { !user ? 
                <li className="nav-item">
                <Link to="/live_msg" className="nav-link">Live Msg</Link>
                </li>
        :''}
        { user?
        <li className="nav-item">
        <Link to="/admin_msg" className="nav-link">Live_Msg</Link>
        </li>: ''
          } */}
        <li className="nav-item">
        <div className="dropdown">
  <Link className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
    Students
  </Link>

  <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li><Link to="/student/2016" className="dropdown-item">2016</Link></li>
    <li><Link to="/student/2017" className="dropdown-item">2017</Link></li>
    <li><Link to="/student/2018" className="dropdown-item">2018</Link></li>
    <li><Link to="/student/2019" className="dropdown-item">2019</Link></li>
    <li><Link to="/student/2020" className="dropdown-item">2020</Link></li>
  </ul>
</div>
        </li>
        {user=="student"?
        <li className="nav-item">
        <Link to="/notices" className="nav-link">Notices</Link>
        </li>:''}
        {user=="student"?
        <li className="nav-item">
        <Link to="/messenger" className="nav-link">Messenger</Link>
        </li>:''}
        {user=="admin"?
        <li className="nav-item">
        <Link to="/addadmin" className="nav-link">Add Admin</Link>
        </li>:''}
        {user=="student"?
        <li className="nav-item">
        <Link to={"/profile/"+userid} className="nav-link">Profile</Link>
        </li>:''}
        {!user?
        <li className="nav-item">
        <Link to="/signup" className="nav-link">Signup</Link>
        </li>:''}
        {user? <button onClick={logout}>Logout</button>:''}
  
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  {/* </div> */}
</nav>
    );
  }
  
  export default Header;