const mongoose = require('mongoose');
const userSchema  = new mongoose.Schema({
    name: string,
    email: { type: String, unique:true},
    passwordHash: String,
    favorites: [{ type: mongoose.Schema.Types.ObjectId,ref: 'Meal'}]
});
module.exports = mongoose.model('User',userSchema);