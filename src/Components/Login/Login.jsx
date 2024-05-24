import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import Navigation from "../Navigation/Navigation"
import './Login.css'




function Login(){

  const {userid, setUserid, role, setRole, username, setUserName, setToken} = useContext(AuthContext);
    const navigate = useNavigate()

    const [info, setInfo] = useState({})

    const handleChange = (e) => {
      setInfo((prev) => ({...prev, [e.target.name]:e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.post(`https://localhost:7204/api/Registrations/login?email=${info.email_Id}&password=${info.password}`)
            let userid = jwtDecode(res.data).Reg_Id;
            setToken(res.data)
            let username = jwtDecode(res.data).firstName;
            let role = jwtDecode(res.data)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
            setUserid(userid)
            setRole(role)
            setUserName(username)
            alert("Logged in Successfully!")
            if(role == "Admin"){
              navigate('/admin/home')
            }
            if(role == "User"){
              navigate("/")
            }
        }
        catch(error){
          alert("Login failed! May be you entered wrong credentials. Please try again.")
            console.log(error)
        }

    }




    return(
      <>
      <Navigation />
    <div className='reg-container'> 
    <div className='reg-box'>

<h1>Login Now</h1>
    <form className="form">
      
     
      <label>
        Email:
        <input type="email" name="email_Id" onChange={handleChange}/>
      </label>
      <label>
        Password:
        <input type="password" name="password" onChange={handleChange}/>
      </label>
     
     
      <input type="submit" value="Login" onClick={handleSubmit} />
    </form>
            
        </div>
        </div>
        </>
    )
}


export default Login