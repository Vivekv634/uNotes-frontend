import React, { useState, useEffect } from 'react';
import LoginImage from '../images/login.svg';
import axios from 'axios';
import Cookies from 'js-cookie';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [fEmail, setFEmail] = useState('');
  const [fPassword, setFPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get('userTokenID')) {
      navigate('/uNotes-frontend/notes');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post('https://unotes-api.onrender.com/auth/login', { email: fEmail, password: fPassword });
    const result = await response.data;
    if (result.error) {
      setError(result.error);
    } else {
      Cookies.set('userTokenID', result.userToken);
      window.location.reload();
    }
  }
  
  return (
    <div className="login">
      <div className="login-container">
        <div className="left"><img src={LoginImage} alt="login" /></div>
        <div className="right">
          <div className="heading">Your Thoughts, Our Canvas - Start Noting!</div>
          <div className="sub-heading">Login now to pause your journey and never miss a extraordinary idea!</div>
          <form type='POST' onSubmit={handleLogin}>
            <Input id='email' label='Email Address' type='email' required={true} value={fEmail} handleValue={setFEmail} />
            <Input id='password' label='Password' type='password' required={true} value={fPassword} handleValue={setFPassword} />
            <div className="error">{error}</div>
            <input type="submit" value="Login Now" />
          </form>
        </div>
      </div>
    </div>
  )
}
