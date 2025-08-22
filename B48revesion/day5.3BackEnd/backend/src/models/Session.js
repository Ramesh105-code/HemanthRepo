const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: String,
  startTime: String,
  endTime: String,
  status: { type: String, enum: ["scheduled", "completed", "canceled"], default: "scheduled" }
});

module.exports = mongoose.model("Session", SessionSchema);
