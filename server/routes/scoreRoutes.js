const express = require('express');
const scoreController = require('../controllers/scoreController');

const router = express.Router();

router.get('/', scoreController.getScores);
router.post('/', scoreController.submitScore);
router.get('/leaderboard', scoreController.getLeaderboard);

module.exports = router;