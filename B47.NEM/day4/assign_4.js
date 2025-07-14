const express = require('express');
const router = express.Router();

let todos = [];
let idCounter = 1;

router.post('/', (req, res) => {
  const newTodo = { id: idCounter++, ...req.body };
  todos.push(newTodo);
  res.status(201).json({ message: 'Todo created', todo: newTodo });
});

router.get('/', (req, res) => {
  res.json(todos);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...req.body };
    res.json({ message: 'Todo updated', todo: todos[index] });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index !== -1) {
    const deleted = todos.splice(index, 1);
    res.json({ message: 'Todo deleted', todo: deleted[0] });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

module.exports = router;
