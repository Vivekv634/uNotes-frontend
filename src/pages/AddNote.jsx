import React, { useState } from 'react';
import Input from '../components/Input';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

export default function AddNote() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`https://unotes-api.onrender.com/user/notes/create?id=${Cookies.get('userTokenID')}`, { title, body });
        const result = await response.data;
        if (result.error) {
            alert(result.error);
        } else {
            window.location.assign('/notes');
        }
    }
    
    return (
        <div className='add-note'>
            <Link to='/notes' className='back-arrow'>&lsaquo; Notes</Link>
            <form onSubmit={handleSubmit} method="post">
                <Input id='title' type='text' label='Note Title' required={true} value={title} handleValue={setTitle} />
                <label htmlFor="body">Note Body</label>
                <textarea id='body' value={body} onChange={e => setBody(e.target.value)} required={true}></textarea>
                <input type="submit" value="Add Note" />
            </form>
        </div>
    )
}
