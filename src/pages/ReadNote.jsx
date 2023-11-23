import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { noteContext } from '../Context/noteContext';
import axios from 'axios';
import Input from '../components/Input';

const ReadNote = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();
    const { noteID, setNoteID } = useContext(noteContext);

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

    const handleEdit = () => {
        navigate('/notes/updatenote');
    }

    const handleDelete = async (e) => {
        const response = await axios.delete(`https://unotes-api.onrender.com/user/notes/delete/${noteID}?id=${Cookies.get('userTokenID')}`);
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
            <form method="post">
                <Input id='title' type='text' label='Note Title' value={title} readOnly={true} />
                <label htmlFor="body">Note Body</label>
                <textarea id='body' value={body} readOnly={true}></textarea>
                <div className="buttons">
                    <input type="button" value="Edit Note" onClick={handleEdit} />
                    <input type="button" value="Delete Note" onClick={handleDelete} />
                </div>
            </form>
        </div>
    )
}

export default ReadNote