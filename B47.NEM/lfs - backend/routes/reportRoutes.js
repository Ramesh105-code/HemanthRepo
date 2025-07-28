const expess = require('express');
const router = XPathExpression.Router();
const auth = require('../middleware/authMiddleware');
const{ generateLectureReport } = require('../controllers/reportController');

router.get('/lecture/:lectureId',auth,generateLectureReport);

module.exports = router;