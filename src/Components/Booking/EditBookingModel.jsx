import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import './EditBookingModel.css'

const EditBookingModel =  ({open, setOpen, id, setLoad, load}) => {
  const {userid} = useContext(AuthContext)
  const [info, setInfo] = useState({'reg_Id':userid})

  useEffect(() => {
    const getBooking = async () => {
      const res = await axios.get(`https://localhost:7204/api/Bookings/${id}`)
      setInfo(res.data)
    }
    if(open) {
      getBooking()
    }
  }, [open, id])

  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.name]:e.target.value}))
  }

  const handleSubmit = async () => {
    try {
       const res =  await axios.put(`https://localhost:7204/api/Bookings/${id}`, info)
       alert("Booking updated successfully!")
       document.getElementById('booking-edit-form').reset();
       setLoad(!load);
       setOpen(false)
    } catch (error) {
        document.getElementById('booking-edit-form').reset();
        console.log(error)
        alert("Please try again!")
    }
  }

  return(
    open && 
    <div className="edit-booking-model-container">
      <div className="edit-booking-model">
        <div className='edit-booking-model-header'>
          <h1>Edit Booking</h1>
          <span onClick={()=>setOpen(false)}>X</span>
        </div>
        <hr />
        <div>
          <form action="" id='booking-edit-form'>
            <div className='booking-ip-box'>
              <label htmlFor="">Booking Date</label>
              <input type="date" name="booking_Date" onChange={handleChange} value={info.booking_Date} />
            </div>
            <div className='booking-ip-box'>
              <label htmlFor="">Service</label>
              <input type="text" name="service_Id" onChange={handleChange} value={info.service_Id} />
            </div>
            <div className='booking-ip-box'>
              <label htmlFor="">Slot</label>
              <input type="text" name="slot_Id" onChange={handleChange} value={info.slot_Id} />
            </div>
            <Link to='/adminbookings'>
                <button onClick={handleSubmit}>Update Booking</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditBookingModel