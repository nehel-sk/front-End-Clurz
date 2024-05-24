
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navigation from '../../Navigation/Navigation';
import './EditSlot.css';

function EditSlot() {


  const [slots, setSlots] = useState([])
  const [load, setLoad] =useState(false)
  const [addSlot, setAddSlot] = useState(false)


  useEffect(()=>{
    const getSlots = async () => {
      const res = await axios.get("https://localhost:7204/api/Slots")

      setSlots(res.data)
    }
    
    getSlots()
  }, [load])

  const handleAdd = () => {
  setAddSlot(!addSlot)    
  };

  const [time, setTime] =useState()

  const handleAddSlot = async (e) => {
    e.preventDefault();
    try {

      await axios.post("https://localhost:7204/api/Slots" , 
        {time : time}
      )
      alert("Added slot successfully!")
      setLoad(!load)

      
    } catch (error) {
      alert("Some error occured. Please try again later.")
        console.log(error)
    }
  }

 

  const handleDelete = async (id) => {
      const confirm = window.confirm("Are you sure to delete this slot?")
      if(confirm) {
        try {
          await axios.delete(`https://localhost:7204/api/Slots/${id}`)
          alert("Deleted slot successfully!")
          setLoad(!load)
        } catch (error) {
          console.log(error)
          alert("Some error occured. Please try again later!")
        }
        
      }
  };

  return (
   <>
   <Navigation />


   <div className="slots">
      <div className='slot-header'>
      <h2>Slot Details</h2>
      <button className="add-button" onClick={handleAdd}>
        Add Slot
      </button>
      </div>

     {addSlot && <div className='add-slot'>
        <form action="">
          <input type="text" name="" onChange={(e)=> setTime(e.target.value)} id="" placeholder='Enter timeslot (Format : "10.00 AM to 10.30 AM")'/>
          <button onClick={handleAddSlot}>Add Now</button>
        </form>

      </div>}
      {slots.map((slot) => (
        <div key={slot.slot_Id} className="slot">
          <h3>{slot.time}</h3>
         
          <button className="delete-button" onClick={() => handleDelete(slot.slot_Id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
   
   </>
  );
}

export default EditSlot;
