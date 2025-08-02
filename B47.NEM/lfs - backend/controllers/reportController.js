const fs = require('fs');
const path = require('path');
const Lecture = require('../models/Lecture');
const Course = require('../models/Course');
const Review = require('../models/LectureReview');

exports.generateLectureReport = async (req, res) => {
  const lecture = await Lecture.findById(req.params.lectureId).populate('course');
  const reviews = await Review.find({ lecture: lecture._id }).populate('user', 'name');

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

  const content = `
Lecture: ${lecture.title}
Course: ${lecture.course.title}
Average Rating: ${avgRating.toFixed(2)}
Reviews:
${reviews.map(r => `- ${r.user.name}: ${r.rating} - ${r.comment}`).join('\n')}
`;

  const filePath = path.join(__dirname, `../reports/lecture_${lecture._id}.txt`);
  fs.writeFileSync(filePath, content);

  res.json({ message: 'Report generated', file: filePath });
};