const Todo = require("../models/todo.model");

exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.create({
      title,
      description,
      createdBy: req.user.userId
    });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMyTodos = async (req, res) => {
  const todos = await Todo.find({ createdBy: req.user.userId });
  res.json(todos);
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, createdBy: req.user.userId });
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    Object.assign(todo, req.body);
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId
    });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllTodos = async (req, res) => {
  const todos = await Todo.find().populate("createdBy", "name email");
  res.json(todos);
};

exports.adminDeleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Admin deleted the todo" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
