const express = require('express');
const auth = require('../middleware/auth');
const { getMealDetails } = require('../controllers/mealController');
router.get('/:id',auth,getMealDetails);

module.exports = router;