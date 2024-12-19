import 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Chat from './Chat';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/chat">Chat</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h2>Welcome to the Home Page</h2>} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

