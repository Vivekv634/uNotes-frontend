import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import HomeImage from '../images/home.svg';

export default function Home() {
  const [cookie, setCookie] = useState('');

  useEffect(() => {
    setCookie(Cookies.get('userTokenID'));
  }, []);

  return (
    <div className="home">
      <div className="home-content">
        <div className="left">
          <div className="heading">Effortless Productivity: Unleash Your Day with uNotes - Your Ultimate To-Do Companion!</div>
          <div className="home-link">
            {cookie ? <Link to='/uNotes-frontend/notes' className='link'>Go To DashBoard</Link> : <Link to='/uNotes-frontend/signup' className='link'>Get Started</Link>}</div>
        </div>
        <div className="right"><img src={HomeImage} alt="" /></div>
      </div>
    </div>
  )
}
