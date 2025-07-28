const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hash, role });
    await user.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const accessToken = jwt.sign({ userId: user._id, role: user.role }, ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id, role: user.role }, REFRESH_SECRET, { expiresIn: '7d' });

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.refresh = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ error: 'Refresh token required' });

  jwt.verify(token, REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired refresh token' });

    const accessToken = jwt.sign({ userId: decoded.userId, role: decoded.role }, ACCESS_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  });
};
