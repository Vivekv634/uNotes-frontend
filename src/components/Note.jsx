import React from 'react';
import DeleteNote from '../images/delete-note.svg';
import EditNote from '../images/edit-note.svg';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { noteContext } from '../Context/noteContext';
import { useNavigate } from 'react-router-dom';

export default function Note(props) {
    const navigate = useNavigate();
    const { setNoteID } = useContext(noteContext);

    const handleEditNote = (e) => {
        setNoteID(props.noteID);
        navigate('/notes/updatenote');
    }

    const handleDeleteNote = async (e) => {
        const response = await axios.delete(`https://unotes-api.onrender.com/user/notes/delete/${props.noteID}?id=${Cookies.get('userTokenID')}`);
        const result = await response.data;
        if (result.error) {
            alert(result.error);
        } else {
            alert(result.success);
            window.location.reload();
        }
    }

    const handleNoteClick = () => {
        setNoteID(props.noteID);
        navigate('/notes/note');
    }
    
    return (
        <div id={props.noteID} className='note'>
            <div className="note-content" onClick={handleNoteClick}>
                <div className='note-title'>{props.title}</div>
                <div className='note-body'>{props.body}</div>
            </div>
            <div className="note-menu">
                <div className="edit-note" onClick={handleEditNote}><img src={EditNote} alt="" id={props.noteID} /></div>
                <div className="delete-note" onClick={handleDeleteNote}><img src={DeleteNote} alt="" /></div>
            </div>
        </div>
    )
}
