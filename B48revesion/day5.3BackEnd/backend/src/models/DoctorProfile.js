const mongoose = require("mongoose");

const DoctorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  specialties: [String],
  experienceYears: Number,
  about: String,
  photoUrl: String,
  avgRating: { type: Number, default: 0 }
});

module.exports = mongoose.model("DoctorProfile", DoctorProfileSchema);
