const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const DB_FILE = './db.json';

const readData = () => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

app.post('/dishes', (req, res) => {
  const dishes = readData();
  const newDish = req.body;

  if (!newDish.id || !newDish.name || !newDish.price || !newDish.category) {
    return res.status(400).json({ error: 'All fields (id, name, price, category) are required' });
  }

  const exists = dishes.some(d => d.id === newDish.id);
  if (exists) {
    return res.status(409).json({ error: 'Dish with this ID already exists' });
  }

  dishes.push(newDish);
  writeData(dishes);
  res.status(201).json(newDish);
});

app.get('/dishes', (req, res) => {
  const dishes = readData();
  res.status(200).json(dishes);
});

app.get('/dishes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const dishes = readData();
  const dish = dishes.find(d => d.id === id);

  if (dish) {
    res.status(200).json(dish);
  } else {
    res.status(404).json({ message: 'Dish not found' });
  }
});

app.put('/dishes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const dishes = readData();
  const index = dishes.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Dish not found' });
  }

  const updatedDish = { ...dishes[index], ...req.body };
  dishes[index] = updatedDish;
  writeData(dishes);
  res.status(200).json(updatedDish);
});

app.delete('/dishes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let dishes = readData();
  const initialLength = dishes.length;

  dishes = dishes.filter(d => d.id !== id);

  if (dishes.length === initialLength) {
    return res.status(404).json({ message: 'Dish not found' });
  }

  writeData(dishes);
  res.status(200).json({ message: 'Dish deleted successfully' });
});

app.get('/dishes/get', (req, res) => {
  const nameQuery = req.query.name?.toLowerCase();

  if (!nameQuery) {
    return res.status(400).json({ message: 'Please provide a name query parameter' });
  }

  const dishes = readData();
  const matched = dishes.filter(d => d.name.toLowerCase().includes(nameQuery));

  if (matched.length > 0) {
    res.status(200).json(matched);
  } else {
    res.status(404).json({ message: 'No dishes found' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
