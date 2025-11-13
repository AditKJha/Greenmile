const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, GOOGLE_CLIENT_ID } = require('../config');
const { OAuth2Client } = require('google-auth-library');
const gClient = new OAuth2Client(GOOGLE_CLIENT_ID);

async function register(req, res) {
  const { email, password, name, role = 'user' } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: "Email already registered" });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, name, password: hash, role });
  res.json({ ok: true, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid email or password" });
  const match = await bcrypt.compare(password, user.password || '');
  if (!match) return res.status(400).json({ error: "Invalid email or password" });
  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ ok: true, token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
}

async function googleLogin(req, res) {
  const { credential } = req.body;
  const ticket = await gClient.verifyIdToken({ idToken: credential, audience: GOOGLE_CLIENT_ID });
  const payload = ticket.getPayload();
  let user = await User.findOne({ email: payload.email });
  if (!user) user = await User.create({ email: payload.email, name: payload.name, password: null, role: "user" });
  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ ok: true, token, user: { id: user._id, email: user.email, name: user.name, role: user.role } });
}

async function me(req, res){
  const user = await User.findById(req.userId, { password: 0 });
  if(!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
}

module.exports = { register, login, googleLogin, me };
