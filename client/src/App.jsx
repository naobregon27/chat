import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Chat from './componente/chat/Chat';
import Home from './componente/home/home';
import './App.css';

function App() {
  const [username, setUsername] = useState('');

  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/" className="active">Home</Link> | 
          {username && <Link to="/chat">Chat</Link>}
        </nav>
        <br />
        <Routes>
          <Route path="/" element={<><h1>¡Ingresa un nombre de usuario!</h1><Home setUsername={setUsername} /></>} />
          <Route path="/chat" element={<Chat username={username} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
