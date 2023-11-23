import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Note from '../components/Note';
import addNoteImage from '../images/add-note.svg';
import addImage from '../images/add.svg';
import { useNavigate, Link } from 'react-router-dom';

export default function Notes() {
    const [userID, setUserID] = useState('');
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('userTokenID')) {
            setUserID(Cookies.get('userTokenID'));
        } else {
            navigate('/uNotes-frontend/signup');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await axios.get(`https://unotes-api.onrender.com/user/notes?id=${userID}`);
            const result = await response.data;
            setNotes(result);
            setLoading(false);
        }
        fetchNotes();
    }, [userID]);

    const trimString = (body, size) => {
        if (body.length > size) {
            return body.substring(0, size).concat('...');
        } else {
            return body;
        }
    }
    
    return (
        <div className="notes">
            <div className="notes-container">
                {loading ?
                    <div className='loading'>Loading...</div> :
                    notes.length ? notes.map(note => { return <Note key={note._id} noteID={note._id} title={trimString(note.title, 40)} body={trimString(note.body, 60)} /> }) :
                        <div className='add-note'>
                            <img src={addNoteImage} alt="add note" />
                            <div className="sub-heading">Make your Note now...</div>
                        </div>
                }
            </div>
            <Link to='/uNotes-frontend/notes/addnote'><img className='add-note-btn' src={addImage} alt="add note button" /></Link>
        </div>
    )
}
