const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { sign } = require('../utils/jwt');

async function register(req, res, next) {
  try {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const exists = await User.findByEmail(email);

    if (exists) {
      return res.status(409).json({ error: 'Email ya registrado' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ full_name, email, password_hash: hash });
    const token = sign(user);

    res.status(201).json({ token, user: { id: user.user_id, full_name, email, registered_at: user.registered_at } });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const ok = await bcrypt.compare(password, user.password_hash);

    if (!ok) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = sign(user);
    
    res.json({ token, user: { id: user.user_id, full_name: user.full_name, email, registered_at: user.registered_at } });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };