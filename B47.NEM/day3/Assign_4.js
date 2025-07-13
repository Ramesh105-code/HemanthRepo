const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const DB_FILE = './db.json';

app.use(express.json());

const readUsers = () => {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch {
    return [];
  }
};

const writeUsers = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

const withoutPassword = (user) => {
  const { password, ...rest } = user;
  return rest;
};

app.post('/users', (req, res) => {
  const users = readUsers();
  const newUser = req.body;

  if (!newUser.id || !newUser.username || !newUser.email || !newUser.password) {
    return res.status(400).json({ error: 'All fields (id, username, email, password) are required' });
  }

  const exists = users.find(u => u.id === newUser.id);
  if (exists) {
    return res.status(409).json({ error: 'User with this ID already exists' });
  }

  users.push(newUser);
  writeUsers(users);
  res.status(201).json(withoutPassword(newUser));
});

app.get('/users', (req, res) => {
  const users = readUsers();
  const result = users.map(withoutPassword);
  res.status(200).json(result);
});

app.get('/users/:id', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id == req.params.id);

  if (!user) return res.status(404).json({ message: 'User not found' });

  res.status(200).json(withoutPassword(user));
});

app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  if ('email' in updates) {
    return res.status(400).json({ message: 'Email cannot be updated' });
  }

  const users = readUsers();
  const index = users.findIndex(u => u.id == id);

  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users[index] = { ...users[index], ...updates };
  writeUsers(users);

  res.status(200).json(withoutPassword(users[index]));
});

app.delete('/users/:id', (req, res) => {
  const users = readUsers();
  const initialLength = users.length;

  const updatedUsers = users.filter(u => u.id != req.params.id);

  if (updatedUsers.length === initialLength) {
    return res.status(404).json({ message: 'User not found' });
  }

  writeUsers(updatedUsers);
  res.status(200).json({ message: 'User deleted successfully' });
});

app.get('/users/search', (req, res) => {
  const usernameQuery = req.query.username?.toLowerCase();

  if (!usernameQuery) {
    return res.status(400).json({ message: 'Please provide a username query' });
  }

  const users = readUsers();
  const results = users
    .filter(u => u.username.toLowerCase().includes(usernameQuery))
    .map(withoutPassword);

  if (results.length > 0) {
    res.status(200).json(results);
  } else {
    res.status(404).json({ message: 'No users found' });
  }
});


app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
