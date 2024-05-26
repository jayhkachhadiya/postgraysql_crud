const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, // Change port if necessary
});

const connect = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database');
    return client;
  } catch (err) {
    console.error('Error connecting to PostgreSQL database', err);
    throw err;
  }
};

module.exports = { connect, pool };
