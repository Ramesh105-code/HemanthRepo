const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addReview, getReviews, getLectureSummary} = require('../controllers/reviewController');

router.post('/', auth, addReview);
router.get('/:lectureId', getReviews);
router.get('/summary/:lectureId', getLectureSummary);

module.exports = router;

