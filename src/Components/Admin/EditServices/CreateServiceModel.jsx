
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './EditServices.css'

const CreateServiceModel =  ({open, setOpen, setLoad, load}) => {

const [info, setInfo] = useState({})

  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.name]:e.target.value}))
  }


  const handleSubmit = async () => {
    try {
       const res =  await axios.post("https://localhost:7204/api/Services", info)
       alert("Service added successfully!")
       document.getElementById('service-create-form').reset();
       setLoad(!load);

       setOpen(false)
        
    } catch (error) {
        document.getElementById('service-create-form').reset();

        console.log(error)
        alert("Please try again!")
    }
  }


    


    return(
        open && 
        <div className="create-service-model-container">
        <div className="create-service-model">
            <div className='create-service-model-header'>
            <h1>Create new Service</h1>
            <span onClick={()=>setOpen(false)}>X</span>
            </div>
            <hr />

            <div>
                <form action="" id='service-create-form'>

                    <div className='service-ip-box'>
                        <label htmlFor="">Service Name</label>
                        <input type="text" name="service_Name" onChange={handleChange} id="" />
                    </div>
                    <div className='service-ip-box'>
                        <label htmlFor="">Service Description</label>
                        <textarea name="description" onChange={handleChange} id="" rows="2"></textarea>
                    </div>
                    <div className='service-ip-box'>
                        <label htmlFor="">Service Price</label>
                        <input type="number" name="price" onChange={handleChange} id="" />
                    </div>
                    <Link to='/adminservices'>
                    <button onClick={handleSubmit}>Create Service</button>
                    </Link>


                </form>
            </div>
        </div>
        </div>
    )
}


export default CreateServiceModel