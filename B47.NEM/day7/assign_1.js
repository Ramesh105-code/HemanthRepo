const Task = require('../models/Task');

exports.addTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const { sortBy = 'dueDate', order = 'asc' } = req.query;
    const sortQuery = { [sortBy]: order === 'asc' ? 1 : -1 };
    const tasks = await Task.find().sort(sortQuery);
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPaginatedTasks = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;
    const tasks = await Task.find().skip(skip).limit(limit);
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTasksByStatus = async (req, res) => {
  try {
    const tasks = await Task.find({ status: req.params.status });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getHighPriorityTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ priority: 'high' });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
