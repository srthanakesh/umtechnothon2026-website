const scoreModel = require('../models/scoreModel');
const teamModel = require('../models/teamModel');

const getScores = async (req, res) => {
  try {
    const { team_id, task_id } = req.query;
    
    if (!team_id || !task_id) {
      return res.status(400).json({ error: 'Team ID and Task ID are required' });
    }
    
    const scores = await scoreModel.getScoresByTeamAndTask(team_id, task_id);
    const totalScore = await scoreModel.getTotalScoreByTeamAndTask(team_id, task_id);
    
    res.json({
      scores,
      total_score: totalScore
    });
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ error: error.message });
  }
};

const submitScore = async (req, res) => {
  try {
    const { 
      team_id,
      task_id,
      criteria_scores = [],
      admin_id
    } = req.body;
    
    if (!team_id || !task_id) {
      return res.status(400).json({ error: 'Team ID and Task ID are required' });
    }
    
    if (!Array.isArray(criteria_scores) || criteria_scores.length === 0) {
      return res.status(400).json({ error: 'Criteria scores are required' });
    }
    
    // Add each criteria score
    const savedScores = [];
    for (const criteriaScore of criteria_scores) {
      const score = await scoreModel.createScore({
        team_id,
        task_id,
        criteria_id: criteriaScore.criteria_id,
        points_awarded: criteriaScore.points_awarded,
        justification: criteriaScore.justification || '',
        admin_id
      });
      savedScores.push(score);
    }
    
    // Calculate total score
    const totalScore = await scoreModel.getTotalScoreByTeamAndTask(team_id, task_id);
    
    res.status(201).json({
      message: 'Scores submitted successfully',
      scores: savedScores,
      total_score: totalScore
    });
  } catch (error) {
    console.error('Error submitting scores:', error);
    res.status(500).json({ error: error.message });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const teamScores = await scoreModel.getTotalScoresForAllTeams();

    // Fetch team names
    const teams = await teamModel.getAllTeams();
    const teamMap = teams.reduce((acc, team) => {
      acc[team.team_id] = team.team_name;
      return acc;
    }, {});

    // Map scores to team names and sort by total_score descending
    const leaderboard = teamScores
      .map(score => ({
        team_name: teamMap[score.team_id] || `Team ${score.team_id}`,
        total_score: score.total_score,
      }))
      .sort((a, b) => b.total_score - a.total_score);

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getScores,
  submitScore,
  getLeaderboard
};