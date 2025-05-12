import { useEffect, useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);

useEffect(() => {
  fetch('http://localhost:5000/messages')
    .then(res => res.json())
    .then(data => {
      setMessages(data);
    })
    .catch(error => {
      console.error('Erreur lors du fetch des messages :', error);
      setMessages([]); // sécurité en cas d'échec
    });
}, []);


  return (
    <div style={{ padding: 20 }}>
      <h1>💬 Forum Anonyme</h1>
      {messages.length === 0 && <p>Aucun message.</p>}
      {messages.map(msg => (
        <div key={msg.id} style={{ marginBottom: 10 }}>
          <strong>{msg.pseudo}</strong> : {msg.content}
        </div>
      ))}
    </div>
  );
}

export default App;
