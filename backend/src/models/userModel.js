const db = require('../utils/db');

async function create({ full_name, email, password_hash }) {
  const [res] = await db.query(
    'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)',
    [full_name, email, password_hash]
  );
  return { user_id: res.insertId, full_name, email, registered_at: new Date() };
}

async function findByEmail(email) {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

module.exports = { create, findByEmail };