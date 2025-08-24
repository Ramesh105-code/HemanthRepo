const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  const { doctor, date } = req.body;
  try {
    const booking = await Booking.create({
      patient: req.user.id,
      doctor,
      date
    });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("patient doctor", "name email");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createBooking, getBookings };
