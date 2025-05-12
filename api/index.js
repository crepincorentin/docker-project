const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Récupération des messages
app.get('/messages', async (req, res) => {
  const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
  res.json(result.rows);
});

// Création d'un message
app.post('/messages', async (req, res) => {
  const { pseudo, content } = req.body;
  const result = await pool.query(
    'INSERT INTO messages (pseudo, content, created_at) VALUES ($1, $2, NOW()) RETURNING *',
    [pseudo, content]
  );
  res.status(201).json(result.rows[0]);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
