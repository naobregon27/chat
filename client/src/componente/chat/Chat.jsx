import { useState, useEffect, useRef } from 'react';
import "./chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
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

  return (
    <div className="chat-container">
      <ul className="messages">
        {messages.map((msg, index) => (
          <li key={index}><b>{msg.timestamp} {msg.username}:</b> {msg.text}</li>
        ))}
      </ul>
      <div className="username-container">
        <label htmlFor="username">Nombre:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa tu nombre"
        />
      </div>
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
