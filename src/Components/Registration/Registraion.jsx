import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './Registration.css';

function Registration() {

  const navigate = useNavigate()

  const [info, setInfo] = useState({})
  const [errors,setErrors]=useState({})


  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.name]:e.target.value}))

    if (!e.target.value) {
      setErrors((prev) => ({...prev, [e.target.name]: 'This field is required'}));}
   
    else if (e.target.name === 'phone_No' && e.target.value.length !== 10) {
      setErrors((prev) => ({...prev, phone_No: 'Phone number must be exactly 10 digits.'}));
    } else if (e.target.name === 'email_Id' && !e.target.value.endsWith('@gmail.com')) {
      setErrors((prev) => ({...prev, email_Id: 'Email should end with @gmail.com'}));
    }
    else if (e.target.name === 'confirm_Password' && e.target.value !== info.password) {
      setErrors((prev) => ({...prev, confirm_Password: 'Password not matched'}));}
     else {
      setErrors((prev) => ({...prev, phone_No: null, email_Id: null,confirm_Password: null}));
    }
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ['first_Name', 'last_Name', 'email_Id', 'password', 'confirm_Password', 'phone_No'];
    for (let field of requiredFields) {
      if (!info[field]) {
        alert(`Please fill the ${field} field.`);
        return;
      }
    }
 
    if (errors.phone_No || errors.email_Id || errors.confirm_Password) {
      alert(errors.phone_No || errors.email_Id || errors.confirm_Password);
      return;
  }

  
    try{
      const res = await axios.post("https://localhost:7204/api/Registrations", info)
      console.log(res.data)
      alert("Registered successfully. Please login now!")
      navigate("/login")
    }
    catch(e){
      alert(e.response.data.title)
      
      
    }
  }


  return (
    <div className='reg-container'> 
    <div className='reg-box'>
    <h1>Register Now</h1>
    <form className="form">
      <label>
        First Name:
        <input type="text" name="first_Name" onChange={handleChange}/>
      </label>
      <label>
        Last Name:
        <input type="text" name="last_Name" onChange={handleChange}/>
      </label>
      <label>
        Email:
        <input type="email" name="email_Id" onChange={handleChange}/>
        {errors.email_Id && <p>{errors.email_Id}</p>}
      </label>
      <label>
        Password:
        <input type="password" name="password" onChange={handleChange}/>
      </label>
      <label>
        Confirm Password:
        <input type="password" name="confirm_Password" onChange={handleChange}/>
        {errors.confirm_Password && <p>{errors.confirm_Password}</p>}
      </label>
      <label>
        Phone Number:
        <input type="tel" name="phone_No" onChange={handleChange}/>
        {errors.phone_No && <p>{errors.phone_No}</p>}
      </label>
      <input type="submit" value="Register" onClick={handleSubmit} />
      
      <label>
        Already registered? 
        <Link to="/Login" className='login-link'> Login</Link>
      </label>
    </form>

    </div>
    
    </div>
  );
}

export default Registration;














