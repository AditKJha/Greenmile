const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

async function adminLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.role !== "admin") return res.status(403).json({ error: "Admin access denied" });
  const match = await bcrypt.compare(password, user.password || '');
  if (!match) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ ok: true, token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
}

module.exports = { adminLogin };
