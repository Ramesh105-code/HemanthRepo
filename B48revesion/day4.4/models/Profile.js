const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  bio: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Profile", profileSchema);
