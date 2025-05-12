import { useEffect, useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/messages')
      .then(res => res.json())
      .then(res => setMessages(res));
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center py-10 justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold mb-2 mx-auto">
          💬
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 mt-6">Forum Anonyme</h1>

        <div className="space-y-4 overflow-y-auto max-h-[500px]">
          {messages.length === 0 ? (
            <p className="text-center text-gray-400">Aucun message pour l’instant...</p>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl shadow-sm">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg">
                  {msg.pseudo.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{msg.pseudo}</p>
                  <p className="text-sm text-gray-600 mt-1">{msg.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 text-center text-white">
          <a
            href="http://localhost:8080"
            className="inline-block bg-green-500 text-white font-medium py-2 px-5 rounded-full shadow hover:bg-green-600 transition"
          >
            Ajouter un message

          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
