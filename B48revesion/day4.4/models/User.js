const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" } // one-to-one
});

module.exports = mongoose.model("User", userSchema);
