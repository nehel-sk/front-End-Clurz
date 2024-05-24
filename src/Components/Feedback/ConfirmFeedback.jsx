import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './ConfirmFeedback.css';

const ConfirmFeedback = () => {
  
    const navigate = useNavigate()
    return (
        <>
        <Navigation />
        <div className="feedback-confirmation">
            <h2>Thank you for your feedback!</h2>
            <p>Your feedback has been received and we appreciate your time and effort.</p>
            <button onClick={() => navigate("/")}>Go to Home Page</button>
        </div>
        </>
    );
};

export default ConfirmFeedback;
