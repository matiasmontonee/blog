const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function sign(user) {
  return jwt.sign(
    { id: user.user_id, email: user.email },
    SECRET,
    { expiresIn: '1d' }
  );
}

function verify(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { sign, verify };