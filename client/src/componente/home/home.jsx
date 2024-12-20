import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; // Asumiendo que tienes un archivo CSS para los estilos

// eslint-disable-next-line react/prop-types
function Home({ setUsername }) {
  const [localUsername, setLocalUsername] = useState('');
  const navigate = useNavigate();

  const handleChat = () => {
    if (localUsername.trim() !== '') {
      setUsername(localUsername);
      navigate('/chat', { state: { username: localUsername } });
    } else {
      alert('Por favor, ingresa tu nombre');
    }
  };

  return (
    <div className="home-container">
      <input
        type="text"
        value={localUsername}
        onChange={(e) => setLocalUsername(e.target.value)}
        placeholder="Ingresa tu nombre"
        className="input-field"
      />
      <button onClick={handleChat} className="chat-button">Chat</button>
    </div>
  );
}

export default Home;
