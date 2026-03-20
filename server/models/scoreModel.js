const supabase = require('../supabaseConfig');

const getTotalScoreByTeamAndTask = async (team_id, task_id) => {
  const { data, error } = await supabase
    .from('scores')
    .select('points_awarded')
    .eq('team_id', team_id)
    .eq('task_id', task_id);
  
  if (error) throw error;
  
  const totalScore = data.reduce((sum, score) => sum + (score.points_awarded || 0), 0);
  return totalScore;
};

const createScore = async (scoreData) => {
  const { data, error } = await supabase
    .from('scores')
    .upsert([{
      team_id: scoreData.team_id,
      task_id: scoreData.task_id,
      criteria_id: scoreData.criteria_id,
      points_awarded: scoreData.points_awarded,
      justification: scoreData.justification || '',
      admin_id: scoreData.admin_id,
      submitted_at: new Date().toISOString()
    }], { onConflict: ['team_id', 'task_id', 'criteria_id'] })
    .select();
  
  if (error) throw error;
  return data[0];
};

const getTotalScoresForAllTeams = async () => {
  const { data, error } = await supabase
    .from('scores')
    .select('team_id, points_awarded');

  if (error) throw error;

  if (!data || data.length === 0) return [];

  // Aggregate scores by team_id
  const teamScores = data.reduce((acc, score) => {
    const tId = score.team_id;
    acc[tId] = (acc[tId] || 0) + (Number(score.points_awarded) || 0);
    return acc;
  }, {});

  //convert to an array of { team_id, total_score }
  return Object.entries(teamScores).map(([tId, total_score]) => ({
    team_id: parseInt(tId, 10),
    total_score,
  }));
};

module.exports = {
  createScore,
  getTotalScoresForAllTeams,
  getTotalScoreByTeamAndTask
};