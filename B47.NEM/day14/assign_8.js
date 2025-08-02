const Todo = require("../models/todo.model");
const redis = require("../redisClient");

exports.createTodo = async (req, res) => {
  const todo = await Todo.create({ ...req.body, userId: req.userId });
  await redis.del(`todos:${req.userId}`);
  res.status(201).send(todo);
};

exports.getTodos = async (req, res) => {
  const key = `todos:${req.userId}`;
  const cached = await redis.get(key);
  if (cached) return res.send(JSON.parse(cached));

  const todos = await Todo.find({ userId: req.userId });
  await redis.setEx(key, 180, JSON.stringify(todos)); // 3 minutes
  res.send(todos);
};

exports.updateTodo = async (req, res) => {
  const updated = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  await redis.del(`todos:${req.userId}`);
  res.send(updated);
};

exports.deleteTodo = async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  await redis.del(`todos:${req.userId}`);
  res.send("Todo deleted");
};
