const Review = require('../models/LectureReview');
const Lecture = require('../models/Lecture');

exports.addReview = async (req, res) => {
  const { lectureId, rating, comment } = req.body;
  try {
    const review = await Review.create({
      lecture: lectureId,
      user: req.user._id,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: 'You already reviewed this lecture' });
  }
};

exports.getReviews = async (req, res) => {
  const reviews = await Review.find({ lecture: req.params.lectureId }).populate('user', 'name');
  res.json(reviews);
};

exports.getLectureSummary = async (req, res) => {
  const summary = await Review.aggregate([
    { $match: { lecture: require('mongoose').Types.ObjectId(req.params.lectureId) } },
    {
      $group: {
        _id: "$lecture",
        avgRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);
  res.json(summary[0] || {});
};