const { Pool } = require('pg');

const pool = new Pool({
  host: 'db',
  user: 'user',
  password: 'password',
  database: 'forum',
  port: 5432,
});

module.exports = pool;
