const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const validateRequestBody = (req, res, next) => {
  const data = req.body;
  const notes = [];
  let isValid = true;

  const addNote = (field, message) => {
    notes.push(`Field "${field}": ${message}`);
    isValid = false;
  };

  if (typeof data.ID !== 'number') {
    addNote('ID', 'Expected number');
  }

  if (typeof data.Name !== 'string') {
    addNote('Name', 'Expected string');
  }

  if (typeof data.Rating !== 'number') {
    addNote('Rating', 'Expected number');
  }

  if (typeof data.Description !== 'string') {
    addNote('Description', 'Expected string');
  }

  if (typeof data.Genre !== 'string') {
    addNote('Genre', 'Expected string');
  }

  if (!Array.isArray(data.Cast)) {
    addNote('Cast', 'Expected array of strings');
  } else {
    for (let i = 0; i < data.Cast.length; i++) {
      if (typeof data.Cast[i] !== 'string') {
        addNote(`Cast[${i}]`, 'Expected string');
      }
    }
  }

  if (isValid) {
    next();
  } else {
    
    fs.writeFileSync('res.txt', notes.join('\n'));
    res.status(400).send('bad request. some data is incorrect.');
  }
};

app.post('/', validateRequestBody, (req, res) => {
  res.status(200).send('data received');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
