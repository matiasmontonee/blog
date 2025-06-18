const { verify } = require('../utils/jwt');

function protect(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  const token = header.split(' ')[1];
  
  try {
    const payload = verify(token);
    req.user = payload;
    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = protect;