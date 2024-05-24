import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import Adminfeedback from '../Admin/Adminfeedback/Adminfeedback'
import './Homepage.css';


function Homepage(){


  const [services, setServices] = useState(null)
  

  useEffect(() => {
    const getServices = async () => {
      const res = await axios.get('https://localhost:7204/api/Services')
      setServices(res.data)
    }
    getServices() 
  }, [])

  
  return (
    <>
          <Navigation />

    <div className="body-container">
      <div className="background-image"></div>
      <div className="content">
        <h1 className="heading">Welcome to Curlz Salon</h1>
        
        <Link to="/register">
        <button className="button">Login/Register</button>
        </Link>
        

        
      </div>
      <div className='services-container' id="ser">
          <h1>Our Services</h1>

          <div className='services-box'>

          {
            services !== null && services?.map((item, index) => (

              <div className='service-card' key={index}>
              <h1>{item.service_Name}</h1>
              <div className='service-card-body'>
                <div className='service-card-body-img'>
                  <img src="/images/salon-icon2.jpg" />

                </div>
                <div className='service-card-body-content'>

                  <p>{item.description}</p>
                  <Link to="/booking"><button>Book Slot</button></Link>
                </div>
              </div>
            </div>
            ))
          }

          </div>
        </div>
        <Adminfeedback />
        <Footer />
    </div></>
  );
};

export default Homepage;




