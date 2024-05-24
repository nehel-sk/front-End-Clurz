import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Navigation from '../Navigation/Navigation';
import './Booking.css';

function Booking() {
  const {userid} =useContext(AuthContext)

  const date= new Date()

  const [services, setService] = useState([])
  const [slots, setSlots] = useState([])
  const [info,setInfo] = useState({'reg_Id':userid,
    'booked_Date':date
  })


  useEffect(()=>{
    const getServices = async ()=>{
      const res = await axios.get("https://localhost:7204/api/Services")
      setService(res.data)
    }
    getServices()
  }, [])

  useEffect(()=>{
    const getSlots = async ()=>{
      const res = await axios.get("https://localhost:7204/api/Slots")
      setSlots(res.data)
    }
    getSlots()
  }, [])
  

  const handleChange = (e)=>{
    setInfo((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleSubmit= async (e)=>{
    e.preventDefault()
    try{
      const res = await axios.post("https://localhost:7204/api/Bookings", info)
      console.log(res.data)
      alert("Booked successfully!")
      
    }
    catch(e){
      alert(e.response.data.title)
  }
}

  return (
    <>
      <Navigation />
    <div className='reg-container'> 
    
    <div className='reg-box'>
    <h1>Book a Slot</h1>
    <form className="form">
      <label>
        Booking Date: 
        <input type="date" name="booking_Date" onChange={handleChange}/>
      </label>

      <label>
        Service:
        <select name="service_Id" onChange={handleChange}>
          <option value="">Select</option>
          {
            services && services?.map((item,index)=>(
              <option value={item.service_Id}>{item.service_Name}</option>
            ))
          }
        </select>
      </label>

      <label>
        Slot:
        <select name="slot_Id" onChange={handleChange}>
          <option value="" >Select</option>
          {
            slots && slots?.map((item,index)=>(
              <option value={item.slot_Id}>{item.time}</option>
            ))
          }
          
        </select>
      </label>

      <input type="submit" value="Book Now" onClick={handleSubmit}/>
    </form>
    </div>
    </div></>
  );
}

export default Booking;
