
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navigation from '../../Navigation/Navigation';
import './Adminfeedback.css';
import StarRatings from 'react-star-ratings';
import { FaRegUser } from "react-icons/fa";

const Adminfeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  
  useEffect(() => {
    const getfeedback = async () => {
      const feedbacks = await axios.get("https://localhost:7204/api/Feedbacks");
      const feedbacksWithUserDetails = await Promise.all(
        feedbacks.data.map(async (feedback) => {
          const userDetails = await axios.get(`https://localhost:7204/api/Registrations/${feedback.reg_Id}`);
          return { ...feedback, user: userDetails.data };
        })
      );
      setFeedbacks(feedbacksWithUserDetails);
    };
    getfeedback();
  }, []);

  // useEffect(()=>{ 
  //   const getfeedback = async ()=>{
  //     const feedbacks = await axios.get("https://localhost:7204/api/Feedbacks")
  //     setFeedbacks(feedbacks.data)
  //   }
  //   getfeedback()
  // }, [])

  return (
    <>
    <Navigation />
    <div className="feedback-container">
      <h1>Feedbacks</h1>
      
      {feedbacks.slice().reverse().map((feedback, index) => (
        <div key={index} className="feedback-card">
          <div className='feedback-card-header'>
            <div className='feedback-card-header-user'>
              <FaRegUser  style={{marginTop: '2px'}}/>
              <p>{feedback.user.first_Name}</p>
            </div>
            
            
            <StarRatings
              rating={feedback.rating}
              starRatedColor="#45a049"
              numberOfStars={5}
              name='rating'
              starDimension="15px"
            /> 
            
          </div>
          <hr />
          <div className='feedback-card-comment'>
            
            <p>{feedback.comment}</p>
          </div>
          <div className='comment-date'>
            <p>{new Date(feedback.commenting_Date).toLocaleDateString()}</p>
          </div>
          
        </div>
      ))}
      </div>
    
    </>
  );
};

export default Adminfeedback;
