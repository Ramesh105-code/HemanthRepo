const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const BlacklistedToken = require('../models/blacklistedTokenModel');

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hash, role });
  res.status(201).json({ message: 'User registered' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const accessToken = jwt.sign({ userId: user._id, role: user.role }, ACCESS_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId: user._id, role: user.role }, REFRESH_SECRET, { expiresIn: '7d' });

  res.json({ accessToken, refreshToken });
};

exports.logout = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  const { refreshToken } = req.body;

  if (accessToken) {
    await BlacklistedToken.create({ token: accessToken, expiresAt: new Date(Date.now() + 15 * 60 * 1000) });
  }
  if (refreshToken) {
    await BlacklistedToken.create({ token: refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
  }

  res.json({ message: "User logged out and tokens blacklisted" });
};

exports.refresh = async (req, res) => {
  const { token } = req.body;
  const isBlacklisted = await BlacklistedToken.findOne({ token });
  if (isBlacklisted) return res.status(403).json({ error: 'Token blacklisted' });

  try {
    const decoded = jwt.verify(token, REFRESH_SECRET);
    const newAccessToken = jwt.sign({ userId: decoded.userId, role: decoded.role }, ACCESS_SECRET, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: 'Invalid refresh token' });
  }
};
