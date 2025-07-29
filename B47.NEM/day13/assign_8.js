const Order = require('../models/order.model');
const User = require('../models/user.model');
const sendEmail = require('../utils/mailer');

exports.createOrder = async (req, res) => {
  const { dish } = req.body;
  const chefs = await User.find({ role: 'chef' });
  if (chefs.length === 0) return res.status(500).json({ message: 'No chefs available' });

  const randomChef = chefs[Math.floor(Math.random() * chefs.length)];
  const order = await Order.create({ user: req.user.id, dish, chef: randomChef._id });
  res.status(201).json(order);
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id).populate('user').populate('dish');
  if (!order || order.chef.toString() !== req.user.id)
    return res.status(403).json({ message: 'Unauthorized' });

  order.status = status;
  await order.save();

  if (status === 'Delivered') {
    await sendEmail(order.user.email, 'Order Delivered', `Your dish "${order.dish.name}" has been delivered.`);
  }

  res.json(order);
};
