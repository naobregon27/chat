import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; // Asumiendo que tienes un archivo CSS para los estilos

function Home() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleChat = () => {
    if (username.trim() !== '') {
      navigate('/chat', { state: { username } });
    } else {
      alert('Por favor, ingresa tu nombre');
    }
  };

  return (
    <div className="home-container">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Ingresa tu nombre"
        className="input-field"
      />
      <button onClick={handleChat} className="chat-button">Chat</button>
    </div>
  );
}

export default Home;
