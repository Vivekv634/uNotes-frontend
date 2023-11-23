import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { noteContext } from '../Context/noteContext';
import axios from 'axios';
import Input from '../components/Input';

const UpdateNote = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const { noteID } = useContext(noteContext);
    const navigate = useNavigate();

    const fetchNote = async () => {
        const response = await axios.get(`https://unotes-api.onrender.com/user/notes/${noteID}?id=${Cookies.get('userTokenID')}`);
        const result = await response.data;
        if (result.error) {
            alert(result.error);
        } else {
            setTitle(result[0].title);
            setBody(result[0].body);
        }
    }
    
    useEffect(() => {
        if (!Cookies.get('userTokenID')) {
            navigate('/signup');
        }
        if (!noteID) {
            navigate('/notes');
        } else {
            fetchNote();
        }
    }, [navigate, noteID]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.put(`https://unotes-api.onrender.com/user/notes/update/${noteID}?id=${Cookies.get('userTokenID')}`, { title, body });
        const result = await response.data;
        if (result.error) {
            alert(result.error);
        } else {
            alert(result.success);
            navigate('/notes');
        }
    }

    return (
        <div className='add-note'>
            <Link to='/notes' className='back-arrow'>&lsaquo; Notes</Link>
            <form onSubmit={handleSubmit} method="post">
                <Input id='title' type='text' label='Note Title' required={true} value={title} handleValue={setTitle} />
                <label htmlFor="body">Note Body</label>
                <textarea id='body' value={body} onChange={e => setBody(e.target.value)} required={true}></textarea>
                <div className="buttons">
                    <input type="submit" value="Update Note" />
                    <input type="button" value="Cancel" className='cancel-btn' onClick={() => navigate('/notes')} />
                </div>
            </form>
        </div>
    )
}

export default UpdateNote;