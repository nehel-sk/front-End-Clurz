import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/AuthContext';
import Navigation from '../../Navigation/Navigation';
import './AdminRegistration.css';

function AdminRegistration() {
  const {token} = useContext(AuthContext)
  const [load, setLoad] = useState(false)

  const [registrations, setRegistrations] = useState([])

  useEffect(() => {
    const getRegistrations = async () => {
      const res = await axios.get('https://localhost:7204/api/Registrations')
      setRegistrations(res.data)
    }
    getRegistrations()
  }, [load])



  const deleteRegistration = async (id) => {
    try {
      const confirm = window.confirm("Are you sure to delete this registration?")
      if (confirm) {
        const res = await axios.delete(`https://localhost:7204/api/Registrations/${id}`)
        console.log(res)
        alert("Registration deleted successfully.")
        setLoad(!load)
      }
    } catch (e) {
      console.log(e)
      alert("Some error occured. Please try again later!")
    }
  }


  return (
    <>
    <Navigation />
    
    <div className="registrations">
      <h1>Registrations</h1><br/>
      {
        registrations && registrations.length === 0 &&
        <div><h1>No registrations made yet</h1></div>
      }
      {registrations && registrations.map((item) => (
        <div key={item.reg_Id} className="registration">
          <div className='registration-card-header'>
            <h1>Registration Id: <span>{item.reg_Id}</span></h1>
            <button onClick={() => deleteRegistration(item.reg_Id)}>Delete User</button>
          </div>
          <hr />

          <div className='registration-details-box'>
            <h1>First Name: {item.first_Name}</h1>
            <h1>Last Name: {item.last_Name}</h1> 
            <h1>Email id: {item.email_Id}</h1>
            <h1>Phone number: {item.phone_No}</h1>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default AdminRegistration;