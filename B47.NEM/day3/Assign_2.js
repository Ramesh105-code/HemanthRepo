
const express = require('express');

const app = express();

const PORT = 3000;

const user1 = { id: 1, name: 'John Doe', email: 'john@example.com' };
const userList = [
  user1,
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  { id: 3, name: 'Bob Smith', email: 'bob@example.com' }
];

app.get('/users/get', (req, res) => {
  res.status(200).json(user1);
});

app.get('/users/list', (req, res) => {
  res.status(200).json(userList);
});

app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
