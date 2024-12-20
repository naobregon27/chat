import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import "./chat.css";

const Chat = () => {
  const location = useLocation();
  const username = location.state?.username ?? 'Anónimo';
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket("wss://chat-e2hc.onrender.com/ws");

    socketRef.current.onopen = () => {
      console.log('Conexión WebSocket establecida');
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Mensaje recibido del servidor:', data);

      if (data.type === 'init') {
        setMessages(data.messages);
      } else {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };

    socketRef.current.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };

    return () => socketRef.current.close();
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (username.trim() === '') {
      alert('Por favor, ingresa tu nombre');
      return;
    }
    const msg = { username, text: input, timestamp: new Date().toLocaleTimeString() };
    console.log('Enviando mensaje al servidor:', msg);
    socketRef.current.send(JSON.stringify(msg));
    setInput('');
  };

  const getColorForUser = (user) => {
    const colors = [
      '#FFC857', '#E9724C', '#C5283D', '#481D24', '#255F85',
      '#64B6AC', '#3D5A80', '#98C1D9', '#EE6C4D', '#293241'
    ];
    const hash = user.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="chat-container">
      <ul className="messages">
        {messages.map((msg, index) => (
          <li key={index} className="message" style={{ backgroundColor: getColorForUser(msg.username) }}>
            <b>{msg.timestamp} {msg.username}:</b> {msg.text}
          </li>
        ))}
      </ul>
      <form className="input-container" onSubmit={sendMessage}>
        <label className="msj">Mensaje:</label>
        <textarea
          className='texter'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button className="perri" type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
