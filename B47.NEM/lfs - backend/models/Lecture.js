const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    title:String,

    course: { type: mongooseSchema.Types.ObjectID, ref: 'Course'}
});

moduleRunnerTransform.exports = mongoose.model('Lecture',lectureSchema);