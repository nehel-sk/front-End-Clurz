import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import Navigation from '../Navigation/Navigation';
import { FaCircleUser } from "react-icons/fa6";
import './UserDetail.css';

function UserDetail() {
  const {userid} = useContext(AuthContext)

  const[userDetails,setUserDetails]= useState([]) 
  const [load, setLoad]  =useState(false)

  useEffect(()=>{
    const getUserDetails= async () => {
      const res = await axios.get(`https://localhost:7204/api/Registrations/${userid}`)
      console.log(res.data)
      setUserDetails(res.data)
    }
    getUserDetails()
  },[load])

  return (
    <>
    <Navigation />
   
    <div className="user-details">
        <h2>My Profile</h2><br/>
      <div key={userDetails.reg_Id} className="user-detail">
            <div className='user-detail-card-header'>
                <h1>User Id: <span>{userDetails.reg_Id}</span></h1>
                <FaCircleUser />
            </div>
            <hr />

            <div className='user-detail-box'>
                <div>
                    <h1>First Name:</h1>
                    <p>{userDetails.first_Name}</p>
                </div>
                <div>
                    <h1>Last Name:</h1>
                    <p>{userDetails.last_Name}</p>
                </div>
                <div>
                    <h1>Email:</h1>
                    <p>{userDetails.email_Id}</p>
                </div>
                <div>
                    <h1>Phone:</h1>
                    <p>{userDetails.phone_No}</p>
                </div>
            </div>

        {/* <div className='user-detail-service-card'>
          
        </div> */}
      </div>
    </div>
    </>
  );
}

export default UserDetail;