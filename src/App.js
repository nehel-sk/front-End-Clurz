import './App.css';
import Feedback from './Components/Feedback/Feedback';
import Booking from './Components/Booking/Booking';
import Homepage from './Components/Home/Homepage';
import { Route, Routes } from 'react-router-dom';
import Registration from './Components/Registration/Registraion';
import Login from './Components/Login/Login';
import Viewbooking from './Components/Booking/Viewbooking';
import ConfirmFeedback from './Components/Feedback/ConfirmFeedback';
import EditBookings from './Components/Admin/EditBooking/EditBookings';
import EditServices from './Components/Admin/EditServices/EditServices';
import EditSlot from './Components/Admin/EditSlot/EditSlot';
import PrivateRoutesAdmin from './util/PrivateRoutesAdmin';
import PrivateRoutesUser from './util/PrivateRoutesUser';
import AdminHome from './Components/Admin/AdminHome/AdminHome';
import Adminfeedback from './Components/Admin/Adminfeedback/Adminfeedback';
import AdminRegistration from './Components/Admin/AdminRegistrations/AdminRegistration';
import UserDetail from './Components/UserProfile/UserDetail';




function App() {
  return (
    <div className="App">
      <Routes>

        <Route path='/login' element={<Login />} /> 
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Registration />} />


      
        <Route element={<PrivateRoutesUser />} >
        <Route path='/booking' element={<Booking />} />
        <Route path='/feedback' element={<Feedback />} /> 
     
        <Route path='/viewbooking' element={<Viewbooking />} />  
        <Route path='/confirmfeedback' element={<ConfirmFeedback />}/>
        <Route path='/userdetails' element={<UserDetail />}/>
        </Route>

        

        <Route element={<PrivateRoutesAdmin />} >
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path='/adminbookings' element={<EditBookings/>}/>
        <Route path='/adminservices' element={<EditServices/>}/>
        <Route path='/adminservices' element={<EditServices/>}/>
        <Route path='/adminfeedback' element={<Adminfeedback/>}/>
        <Route path='/adminregistrations' element={<AdminRegistration />} />
        
        <Route path='/adminslot' element={<EditSlot/>}/>
        <Route path='/adminhome' element={<AdminHome/>}/>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
