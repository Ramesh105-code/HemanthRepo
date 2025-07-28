const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title:String,
});

moduleRunnerTransform.exports = mongoose.model('Course',courseSchema);