import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './EditServices.css';
import CreateServiceModel from './CreateServiceModel';
import EditServiceModel from './EditServiceModel'; 
import Navigation from '../../Navigation/Navigation';

 
function EditServices() {
 
  const [services, setServices] = useState()
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false) 
  const [editServiceId, setEditServiceId] = useState(null) 
 
  const [load, setLoad] = useState(false)
  useEffect(() => {
    const getServices = async () => {
      const res = await axios.get('https://localhost:7204/api/Services')
      setServices(res.data)
    }
    getServices()
  }, [load])
 
  const deleteService = async (id) => {
    try {
      const confirm = window.confirm("Are you sure to delete this service?")
      if(confirm){
        await axios.delete(`https://localhost:7204/api/Services/${id}`)
        alert("Deleted successfully!")
        setLoad(!load)
      }
    } catch (error) {
      console.log(error)
      alert("Some error occured. Please try again later!")
    }
  }
 
  const editService = (id) => { 
    setEditServiceId(id)
    setEditOpen(true)
  }
 
  return (
    <>
    <Navigation />
 
    <CreateServiceModel open={open} setOpen={setOpen} setLoad={setLoad} load={load}/>
    <EditServiceModel open={editOpen} setOpen={setEditOpen} id={editServiceId} setLoad={setLoad} load={load}/>
 
    <div className='admin-service-container'>
      <div className='admin-service-container-header'>
        <h1>Services</h1>
        <button onClick={()=>setOpen(true)}>Create service</button>
      </div>
 
      <div className='admin-service-body'>
        {services && services?.map((item, index)=> (
          <div key={index} className="admin-service-card">
            <div className='admin-service-card-header'>
              <h1>{item.service_Name}</h1>
              <div className='admin-service-card-header-btns'>
              <button onClick={()=>deleteService(item.service_Id)}>Delete service</button>
              <button onClick={()=>editService(item.service_Id)}>Edit service</button>
              </div>
            </div>
 
            <div>
              <p>{item.description}</p>
              <p className='price'>₹ {item.price}</p>
            </div>
 
          </div>
        ))}
 
      </div>
    </div>
</>
 
  );
}
 
export default EditServices;
 