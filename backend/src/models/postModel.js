const db = require('../utils/db');

async function getAll() {
  const [rows] = await db.query(`
    SELECT
      p.post_id     AS id,
      p.title       AS title,
      p.body        AS body,
      p.created_at  AS created_at,
      u.user_id     AS user_id,
      u.full_name   AS author
    FROM posts p
    JOIN users u ON p.user_id = u.user_id
    ORDER BY p.created_at DESC
  `);
  return rows;
}

async function getById(id) {
  const [rows] = await db.query(`
    SELECT
      p.post_id     AS id,
      p.title       AS title,
      p.body        AS body,
      p.created_at  AS created_at,
      u.user_id     AS user_id,
      u.full_name   AS author
    FROM posts p
    JOIN users u ON p.user_id = u.user_id
    WHERE p.post_id = ?
  `, [id]);
  return rows[0];
}

async function create({ title, body, user_id }) {
  const [result] = await db.query(
    'INSERT INTO posts (title, body, user_id) VALUES (?, ?, ?)',
    [title, body, user_id]
  );
  return {
    id: result.insertId,
    title,
    body,
    user_id
  };
}

async function update(id, { title, body }) {
  await db.query(
    `UPDATE posts SET title = ?, body = ? WHERE post_id = ?`,
    [title, body, id]
  );
  return getById(id);
}

async function remove(id) {
  await db.query(
    `DELETE FROM posts WHERE post_id = ?`,
    [id]
  );
}

module.exports = { getAll, getById, create, update, remove };