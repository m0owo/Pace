const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pacedb',
  password: 'thisisbananas123',
  port: process.env.DB_PORT || 5432,
});
module.exports = pool;
