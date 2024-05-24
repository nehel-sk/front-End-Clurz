import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './EditServices.css'

const EditServiceModel =  ({open, setOpen, id, setLoad, load}) => {
  const [info, setInfo] = useState({})

  useEffect(() => {
    const getService = async () => {
      const res = await axios.get(`https://localhost:7204/api/Services/${id}`)
      setInfo(res.data)
    }
    if(open) {
      getService()
    }
  }, [open, id])

  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.name]:e.target.value}))
  }

  const handleSubmit = async () => {
    try {
       const res =  await axios.put(`https://localhost:7204/api/Services/${id}`, info)
       alert("Service updated successfully!")
       document.getElementById('service-edit-form').reset();
       setLoad(!load);
       setOpen(false)
    } catch (error) {
        document.getElementById('service-edit-form').reset();
        console.log(error)
        alert("Please try again!")
    }
  }

  return(
    open && 
    <div className="edit-service-model-container">
      <div className="edit-service-model">
        <div className='edit-service-model-header'>
          <h1>Edit Service</h1>
          <span onClick={()=>setOpen(false)}>X</span>
        </div>
        <hr />
        <div>
          <form action="" id='service-edit-form'>
            <div className='service-ip-box'>
              <label htmlFor="">Service Name</label>
              <input type="text" name="service_Name" onChange={handleChange} value={info.service_Name} />
            </div>
            <div className='service-ip-box'>
              <label htmlFor="">Service Description</label>
              <textarea name="description" onChange={handleChange} value={info.description} rows="2"></textarea>
            </div>
            <div className='service-ip-box'>
              <label htmlFor="">Service Price</label>
              <input type="number" name="price" onChange={handleChange} value={info.price} />
            </div>
            <Link to='/adminservices'>
                <button onClick={handleSubmit}>Update Service</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditServiceModel
