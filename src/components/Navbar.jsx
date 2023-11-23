import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Navbar() {
    const [Cookie, setCookie] = useState('');

    useEffect(() => {
        setCookie(Cookies.get('userTokenID'));
    }, []);

    const logout = () => {
        const confirmation = window.confirm('Do you want to logout?');
        if (confirmation) {
            Cookies.remove('userTokenID');
            window.location.reload();
        }
    }
    
    return (
        <div className="navbar">
            <div className="nav-container">
                <Link to='/uNotes-frontend/' className="brand"><div>uNotes</div></Link>
                <ul className="nav-list">
                    {!Cookie && <li><Link to='/uNotes-frontend/signup' className="nav-link">Signup</Link></li>}
                    {!Cookie && <li><Link to='/uNotes-frontend/login' className="nav-link">Login</Link></li>}
                    {Cookie && <li><Link className="nav-link" onClick={logout}>LogOut</Link></li>}
                </ul>
            </div>
        </div>
    )
}
