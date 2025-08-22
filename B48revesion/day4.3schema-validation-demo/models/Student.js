const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ 
  },
  age: {
    type: Number,
    min: 18, 
    max: 60  
  },
  course: {
    type: String,
    enum: ["Math", "Science", "History", "Computer Science"], 
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);
