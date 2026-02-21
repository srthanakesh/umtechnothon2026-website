const supabase = require('../supabaseConfig');

const getScoresByDeliverableId = async (deliverable_id) => {
  const { data, error } = await supabase
    .from('scores')
    .select(`
      *,
      criteria:criteria_id(*)
    `)
    .eq('deliverable_id', deliverable_id);
  
  if (error) throw error;
  return data;
};

const getTotalScoreForDeliverable = async (deliverable_id) => {
  const { data, error } = await supabase
    .from('scores')
    .select('points_awarded')
    .eq('deliverable_id', deliverable_id);
  
  if (error) throw error;
  
  // Calculate the total score
  const totalScore = data.reduce((sum, score) => sum + score.points_awarded, 0);
  return totalScore;
};

const createScore = async (scoreData) => {
  const { data, error } = await supabase
    .from('scores')
    .insert([{
      deliverable_id: scoreData.deliverable_id,
      criteria_id: scoreData.criteria_id,
      points_awarded: scoreData.points_awarded,
      justification: scoreData.justification || '',
      admin_id: scoreData.admin_id,
      submitted_at: new Date().toISOString()
    }])
    .select();
  
  if (error) throw error;
  return data[0];
};

const getTotalScoresForAllTeams = async () => {
  const { data, error } = await supabase
    .from('scores')
    .select(`
      deliverable:deliverable_id(team_id),
      points_awarded
    `);

  if (error) throw error;

  // Aggregate scores by team_id
  const teamScores = data.reduce((acc, score) => {
    const teamId = score.deliverable.team_id;
    acc[teamId] = (acc[teamId] || 0) + score.points_awarded;
    return acc;
  }, {});

  // Convert to an array of { team_id, total_score }
  return Object.entries(teamScores).map(([team_id, total_score]) => ({
    team_id: parseInt(team_id, 10),
    total_score,
  }));
};

module.exports = {
  getScoresByDeliverableId,
  getTotalScoreForDeliverable,
  createScore,
  getTotalScoresForAllTeams
};