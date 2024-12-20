import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Chat from './componente/chat/Chat';
import Home from './componente/home/Home';
import './App.css';

function App() {
  const [username, setUsername] = useState('');

  return (
    <Router>
      <AppContent username={username} setUsername={setUsername} />
    </Router>
  );
}

function AppContent({ username, setUsername }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsername('');
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="active">Home</Link> | 
        {username && <Link to="/chat">Chat</Link>}
      </nav>
      <br />
      <Routes>
        <Route path="/" element={<><h1>¡Ingresa un nombre de usuario!</h1><Home setUsername={setUsername} /></>} />
        <Route path="/chat" element={<Chat username={username} handleLogout={handleLogout} />} />
      </Routes>
    </div>
  );
}

export default App;
