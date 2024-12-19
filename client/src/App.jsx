import  { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Chat from './componente/chat/Chat';
import Login from './componente/login/login';
import './App.css';

function App() {
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setUsername(username);
  };

  return (
    <Router>
      <div>
        {username && (
          <nav className="navbar">
            <Link to="/home" className="active">Home</Link> | <Link to="/chat">Chat</Link>
          </nav>
        )}
        <Routes>
          <Route
            path="/"
            element={username ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/home"
            element={username ? <h1>Bienvenido a mi Chat!</h1> : <Navigate to="/" />}
          />
          <Route
            path="/chat"
            element={username ? <Chat username={username} /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
