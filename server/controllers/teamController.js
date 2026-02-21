const teamModel = require('../models/teamModel');

const getAllTeams = async (req, res) => {
  try {
    const teams = await teamModel.getAllTeams();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTeamById = async (req, res) => {
  try {
    const team = await teamModel.getTeamById(req.params.team_id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTeam = async (req, res) => {
  try {
    const { teamName, memberEmails } = req.body;
    const leaderId = req.user.participant_id; // Assuming you have user data in the request from auth middleware
    
    // Validate required fields
    if (!teamName || !memberEmails || !Array.isArray(memberEmails)) {
      return res.status(400).json({ 
        error: 'Team name and member emails array are required' 
      });
    }
    
    // Validate emails format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = memberEmails.filter(email => !emailRegex.test(email));
    
    if (invalidEmails.length > 0) {
      return res.status(400).json({ 
        error: 'Invalid email format', 
        invalidEmails 
      });
    }
    
    const result = await teamModel.createTeam({
      teamName,
      memberEmails,
    }, leaderId);
    
    if (!result.success) {
      return res.status(400).json({ 
        error: result.message,
        details: result.nonExistingEmails || result.alreadyInTeam
      });
    }
    
    res.status(201).json({
      message: 'Team created successfully',
      team: result.team,
      members: result.members
    });
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: error.message });
  }
};

const getTeamMembers = async (req, res) => {
  try {
    const { team_id } = req.params;
    
    const members = await teamModel.getTeamMembers(team_id);
    
    res.status(200).json(members);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  getTeamMembers,
};