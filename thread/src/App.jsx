import { useEffect, useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/messages')
      .then(res => res.json())
      .then(res => console.log(res))
      .then(setMessages);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">💬 Forum Anonyme</h1>
        
        <button
          onClick={() => window.location.href = 'http://localhost:8080'}
          className="w-full sm:w-auto bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300 mb-6"
        >
          Ajouter un message
        </button>

        {messages.length === 0 ? (
          <p className="text-center text-gray-500">Aucun message.</p>
        ) : (
          <div className="space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50">
                <strong className="text-lg text-blue-600">{msg.pseudo}</strong> : <span>{msg.content}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
