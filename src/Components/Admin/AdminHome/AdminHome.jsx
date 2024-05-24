import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../../Navigation/Navigation';
import './AdminHome.css';

const AdminHome = () => {
 

  return (
   <>

   <Navigation />
   <div className='panel-box'>
    <div className='panel-container'>

    
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <ul>
        <Link to="/adminbookings">
        <li>Bookings</li>
        </Link>

        <Link to="/adminservices">
        <li>Services</li>
        </Link>

        <Link to="/adminslot">
        <li>Slots</li>
        </Link>

        <Link to="/adminregistrations">
        <li>Registrations</li>
        </Link>
        
        
      </ul>
    </div>
    </div>
    </div>
   
   </>
  );
};

export default AdminHome;
