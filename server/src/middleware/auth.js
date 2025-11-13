const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = auth;
