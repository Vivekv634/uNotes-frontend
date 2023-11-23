import React, { useEffect, useState } from 'react';
import SignupImage from '../images/signup.svg';
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [disable, setDisable] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('userTokenID')) {
            navigate('/notes');
        }
    }, [navigate]);

    useEffect(() => {
        if (name.length) {
            if (/^[a-zA-Z ]*$/.test(name)) {
                setError('');
                setDisable(false);
            } else {
                setError('Enter valid name');
                setDisable(true);
            }
        } else {
            setError('');
            setDisable(true);
        }
        if (password.length) {
            if (password.length < 8) {
                setError('Password must contain 8 letters');
                setDisable(true);
            } else {
                setError('');
                setDisable(false);
            }
        } else {
            setError('');
            setDisable(true);
        }
    }, [password, name]);

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await axios.post('https://unotes-api.onrender.com/auth/signup', { name, email, password });
        const result = response.data;
        if (result.error) {
            setError(result.error);
        } else {
            alert(result.success);
            window.location.assign('/login');
        }
    }
    
    return (
        <div className="signup">
            <div className="signup-container">
                <div className="left"><img src={SignupImage} alt="" /></div>
                <div className="right">
                    <div className="heading">Your notes, your way!</div>
                    <div className="sub-heading">Sign up for our note-taking web application and never miss a brilliant idea again. Start your note-taking journey today!</div>
                    <form typeof='POST' onSubmit={handleSignup}>
                        <Input id='fullname' type='text' label='Full Name' value={name} handleValue={setName} required={true} />
                        <Input id='email' type='email' label='Email Address' value={email} handleValue={setEmail} required={true} />
                        <Input id='password' type='password' label='Password' value={password} handleValue={setPassword} required={true} />
                        <div className="error">{error}</div>
                        <div className="signup-btns">
                            <input type="submit" value="Sign Up Now" disabled={disable} />
                            <Link to='/login' className='login-btn'>Get Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
