const express = require('express');
const teamController = require('../controllers/teamController');
const { verifyToken } = require('../middlewares/verifyToken.js');

const router = express.Router();

router.get('/', teamController.getAllTeams);
router.get('/:team_id', teamController.getTeamById);
router.post('/', verifyToken, teamController.createTeam);
router.get('/:team_id/members', teamController.getTeamMembers);

module.exports = router;