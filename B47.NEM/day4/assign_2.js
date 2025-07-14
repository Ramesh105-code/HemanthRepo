const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'src', 'access.log'), { flags: 'a' });

morgan.token('http-version', (req) => req.httpVersion);
const customFormat = ':method :status :res[content-length] - :response-time ms :date[iso] HTTP/:http-version :url\n';

app.use(morgan(customFormat, { stream: accessLogStream }));

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Home Page');
});

app.get('/get-users', (req, res) => {
  res.status(200).send('List of users');
});

app.post('/add-user', (req, res) => {
  res.status(201).send('User added successfully');
});

app.put('/user/:id', (req, res) => {
  res.status(201).send(`User with id ${req.params.id} updated successfully`);
});

app.delete('/user/:id', (req, res) => {
  res.send(`User with id ${req.params.id} deleted successfully`);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
