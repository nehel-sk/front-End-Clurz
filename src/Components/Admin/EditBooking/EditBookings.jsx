import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/AuthContext';
import Navigation from '../../Navigation/Navigation';
import './EditBookings.css';

function EditBookings() {
  const {token} = useContext(AuthContext)
  const [load, setLoad] = useState(false)

  const [booking, setbooking] = useState([])

  useEffect(() => {
    const getBookings = async () => {
      const res = await axios.get('https://localhost:7204/api/Bookings')
      setbooking(res.data)
    }
    getBookings()
  }, [load])






const confirmBooking = async (item) => {
  try {
    const crfm = window.confirm("Confirm this booking?")
    if (crfm) {

      item.status = "Confirmed"
      

      const res = await axios.put(`https://localhost:7204/api/Bookings/${item.booking_Id}`, item)
      console.log(res)
      alert("Booking confirmed successfully.")
        setLoad(!load)
    }
  } catch (e) {
    console.log(e)
  } 

}

  const cancelBooking = async (item) => {
    try {
      const confirm = window.confirm("Are you sure to cancel this booking?")
      if (confirm) {

        item.status = "Cancelled"
      

        const res = await axios.put(`https://localhost:7204/api/Bookings/${item.booking_Id}`, item)
        console.log(res)   
        alert("Booking canceled successfully.")
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



<div className="bookings">
      <h1>All Bookings</h1><br/>
      {
        booking && booking.length == 0 &&
        <div><h1>No bookings made yet</h1></div>
      }
      {booking && booking.toReversed().map((item, index) => (
        <div key={item.booking_Id} className="booking">
          <div className='booking-card-header'>
            <h1>Booking Id: <span>{item.booking_Id}</span></h1>
           <div className='booking-card-header-buttons'>
            {item.status == "Confirmed" && <span className='booked-span'>Confirmed Booking !</span>}
            {item.status == "Cancelled" && <span className='cancelled-span'>Cancelled Booking !</span>}

           {item.status !== "Cancelled" && <button onClick={() => cancelBooking(item)}>Cancel Booking</button>}
            {item.status == null && <button onClick={() => confirmBooking(item)}>Confirm Booking</button>}
           </div>
          </div>
          <hr />

          <div className='booking-date-box'>

            <h1>Booked on: {new Date(item.booked_Date).toLocaleDateString()}</h1>
            <h1>Booked For: {new Date(item.booking_Date).toLocaleDateString()}</h1>
            <h1>Booked Slot: {item.slot.time}</h1>


          </div>
          
          <div className='booking-date-box'>

            <h1>User name: {item.registration.first_Name}</h1>
            <h1>Email id: {item.registration.email_Id}</h1>
            <h1>Phone number: {item.registration.phone_No}</h1>
           

          </div>


          <div className='booking-box-service-card'>
            <h1>Service Details</h1>
            <hr />
            <div>
              <h3>{item.service.service_Name}</h3>
              <p>{item.service.description}</p>
              <p className='price'>&#x20b9; {item.service.price}</p>
            </div>
          </div>



        </div>
      ))}
    </div>
    
    
    
    
    </>
  );
}

export default EditBookings;
