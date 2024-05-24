import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './Navigation.css';

function Navigation() {

  const navigate = useNavigate()



  const handleLogout = () => {
    setUserid(null)
    setRole(null)

    navigate("/login")
  }



  
  const {userid, role, setUserid, setRole, username} = useContext(AuthContext)
  return (
    <div className="navbar">
      <Link className="nav-link" to="/">Curlz</Link>
      <div className="nav-right">
        <Link className="nav-link" to="/">Home</Link>
        { role === "User" && <Link className="nav-link" to="/booking">Book a Slot</Link>}

        { role === "User" && <Link className="nav-link" to="/viewbooking">My Bookings</Link>}
        {role === "Admin" &&  <Link className="nav-link" to="/adminfeedback">View feedbacks</Link>}
        {role === "Admin" &&  <Link className="nav-link" to="/adminbookings">All bookings</Link>}
        {role === "Admin" &&  <Link className="nav-link" to="/adminservices">Services</Link>}
        {role === "Admin" &&  <Link className="nav-link" to="/admin/home">Panel</Link>}
        {role === "Admin" &&  <Link className="nav-link" to="/adminregistrations">All Registrations</Link>}


        { role === "User" && <Link className="nav-link" to="/feedback">Add Feedback</Link>}
        { role === "User" && <Link className="nav-link" to="/userdetails">My Profile</Link>}

        {userid === null && <Link className="nav-link" to="/Login">
          <button className='btn-login'>Login</button>
        </Link>}


       {userid !== null && <div className='nav-profile'>
          <span>Logged in as {username}</span>
        </div>}


        {userid !== null && 
        
        <button className='btn-login' onClick={handleLogout}>Logout</button>}


      </div>
    </div>
  );
}

export default Navigation;
