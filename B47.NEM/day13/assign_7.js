// controllers/booking.controller.js
const Booking = require('../models/booking.model');
const sendEmail = require('../utils/mailer');

exports.createBooking = async (req, res) => {
  const booking = await Booking.create({ ...req.body, user: req.user.id });
  await sendEmail(req.user.email, 'Booking Confirmed', `Your booking to ${booking.destination} is confirmed.`);
  res.status(201).json(booking);
};

exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id });
  res.json(bookings);
};

exports.updateBooking = async (req, res) => {
  const booking = await Booking.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json(booking);
};

exports.deleteBooking = async (req, res) => {
  const booking = await Booking.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (booking) await sendEmail(req.user.email, 'Booking Cancelled', `Your booking to ${booking.destination} has been cancelled.`);
  res.json({ message: 'Booking deleted' });
};

exports.adminAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate('user', 'email');
  res.json(bookings);
};
