import { useState } from 'react';

function App() {
  const [pseudo, setPseudo] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:5000/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pseudo, content }),
    });

    setPseudo('');
    setContent('');
    alert('Message envoyé !');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>✉️ Envoyer un message</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Pseudonyme"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Votre message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <br />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default App;
