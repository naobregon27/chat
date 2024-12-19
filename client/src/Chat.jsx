import  { useState, useEffect, useRef } from 'react';
import './App.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8080');
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'init') {
        setMessages(data.messages);
      } else {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    return () => socketRef.current.close();
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const msg = { text: input, timestamp: new Date().toLocaleTimeString() };
    socketRef.current.send(JSON.stringify(msg));
    setInput('');
  };

  return (
    <div className="chat-container">
      <ul className="messages">
        {messages.map((msg, index) => (
          <li key={index}><b>{msg.timestamp}:</b> {msg.text}</li>
        ))}
      </ul>
      <form className="input-container" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
