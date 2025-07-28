const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    lecture: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture'},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    rating: { type: Number, min: 1, max: 5},
    comment: String,
},{ timestamps: true});

reviewSchema.index({ lecture: 1,user: 1},{unique: true});
module.exports = mongoose.model('LectureReview', reviewSchema);