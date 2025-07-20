const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: String,
  eventDate: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => value > new Date(),
      message: 'Event date must be a future date',
    },
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: [1, 'Capacity must be greater than 0'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

eventSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

module.exports = mongoose.model('Event', eventSchema);
