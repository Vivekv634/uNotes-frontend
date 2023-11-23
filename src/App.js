import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { noteContext } from './Context/noteContext.js';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Notes from './pages/Notes';
import AddNote from './pages/AddNote';
import PageNotFound from './pages/PageNotFound';
import UpdateNote from './pages/UpdateNote';
import ReadNote from './pages/ReadNote.jsx';

function App() {
  const [noteID, setNoteID] = useState('');
  
  return (
    <noteContext.Provider value={{ noteID, setNoteID }}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/uNotes-frontend/' element={<Home />} />
          <Route exact path='/uNotes-frontend/signup' element={<Signup />} />
          <Route exact path='/uNotes-frontend/login' element={<Login />} />
          <Route exact path='/uNotes-frontend/notes' element={<Notes />} />
          <Route exact path='/uNotes-frontend/notes/note' element={<ReadNote />} />
          <Route exact path='/uNotes-frontend/notes/addnote' element={<AddNote />} />
          <Route exact path='/uNotes-frontend/notes/updatenote' element={<UpdateNote />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </noteContext.Provider>
  );
}

export default App;
