const mongoose = require('mongoose');


const ALLOWED_SECRET_QUESTIONS = [
'What is your favorite book?',
'What street did you grow up on?',
'Who was your childhood best friend?',
'What is the name of your favorite teacher?',
'What is your dream travel destination?',
'What was your childhood nickname?',
'What is the name of your favorite sports team?'
];


const userSchema = new mongoose.Schema({
name: { type: String, required: true, trim: true },
email: { type: String, required: true, unique: true, lowercase: true, trim: true },
password: { type: String, required: true }, // hashed
role: { type: String, enum: ['user', 'admin'], default: 'user' },
secretQuestion: { type: String, enum: ALLOWED_SECRET_QUESTIONS, required: true },
secretAnswer: { type: String, required: true }, // hashed
}, { timestamps: true });


// Expose allowed questions for other modules
userSchema.statics.allowedSecretQuestions = () => ALLOWED_SECRET_QUESTIONS;


module.exports = mongoose.model('User', userSchema);