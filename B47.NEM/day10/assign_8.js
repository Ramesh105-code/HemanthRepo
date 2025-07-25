const Review = require('../models/Review');

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review || review.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    review.rating = req.body.rating;
    review.comment = req.body.comment;
    await review.save();
    res.status(200).json(review);
  } catch {
    res.status(400).json({ error: "Update failed" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review || review.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    await review.remove();
    res.status(200).json({ message: "Review deleted" });
  } catch {
    res.status(400).json({ error: "Delete failed" });
  }
};
