import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const requestOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/send-otp', { email });
      setMessage(response.data.message);
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/verify-otp', { email, otp });
      setMessage(response.data.message);
      if (response.data.message === 'Login successful') {
        navigate('/welcome');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error verifying OTP');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">OTP Login</h2>
      {step === 1 && (
        <div className="form-group">
          <input 
            type="email"
            className="input-field"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="button" onClick={requestOtp}>Send OTP</button>
        </div>
      )}
      {step === 2 && (
        <div className="form-group">
          <input
            type="text"
            className="input-field"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="button" onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Login;