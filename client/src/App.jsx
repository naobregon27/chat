import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Chat from './componente/chat/Chat';
import Home from './componente/home/home';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/" className="active">Home</Link> | <Link to="/chat">Chat</Link>
        </nav>
        <br />
        <Routes>
          <Route path="/" element={<><h1> Ingrega un nombre de usuario!</h1><Home /></>} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
