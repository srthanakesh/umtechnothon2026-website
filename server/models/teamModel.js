const supabase = require('../supabaseConfig');

const getAllTeams = async () => {
  const { data, error } = await supabase
    .from('teams')
    .select('*');
  if (error) throw error;
  return data;
};

const getTeamById = async (team_id) => {
  try {
    // Fetch team details
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .select("*")
      .eq("team_id", team_id)
      .single();

    if (teamError) throw teamError;

    // Fetch total score for the team
    const { data: scores, error: scoreError } = await supabase
      .from("scores")
      .select("points_awarded, deliverable:deliverable_id(task_id)")
      .eq("deliverable.team_id", team_id);

    if (scoreError) throw scoreError;

    const totalScore = scores.reduce((sum, score) => sum + score.points_awarded, 0);

    return {
      ...team,
      total_score: totalScore,
    };
  } catch (err) {
    console.error("Error fetching team by ID:", err);
    return { error: err.message };
  }
};

const createTeam = async (teamData, leaderId) => {
  const { teamName, memberEmails } = teamData;
  
  try {
    // 1. Get leader's details
    const { data: leader, error: leaderError } = await supabase
      .from('participants')
      .select('participant_id, email, team_id, full_name')
      .eq('participant_id', leaderId)
      .single();
    
    if (leaderError) throw leaderError;
    
    // Check if leader is already in a team
    if (leader.team_id !== null) {
      return {
        success: false,
        message: "You are already a member of another team"
      };
    }
    
    // 2. Create list of all emails to check (including member emails)
    const allEmails = [...memberEmails];
    
    // 3. Check if all provided emails exist in participants table
    const { data: existingParticipants, error: emailCheckError } = await supabase
      .from('participants')
      .select('participant_id, email, team_id, full_name')
      .in('email', allEmails);
    
    if (emailCheckError) throw emailCheckError;
    
    // Find emails that don't exist in the system
    const nonExistingEmails = allEmails.filter(
      email => !existingParticipants.some(participant => participant.email === email)
    );
    
    // If any email doesn't exist, abort the team creation
    if (nonExistingEmails.length > 0) {
      return {
        success: false,
        nonExistingEmails,
        message: "Cannot create team: Some email addresses are not registered in the system"
      };
    }
    
    // 4. Check if any participant is already in another team
    const alreadyInTeam = existingParticipants.filter(p => p.team_id !== null);
    
    if (alreadyInTeam.length > 0) {
      return {
        success: false,
        alreadyInTeam: alreadyInTeam.map(p => ({ email: p.email, full_name: p.full_name })),
        message: "Cannot create team: Some participants are already members of other teams"
      };
    }
    
    // 5. Create the team
    const { data: team, error: teamError } = await supabase
      .from('teams')
      .insert([{ 
        team_name: teamName, 
        reg_date_time: new Date().toISOString(),
      }])
      .select()
      .single();
    
    if (teamError) throw teamError;
    
    // 6. Combine leader and other participants
    const allParticipants = [leader, ...existingParticipants];
    const allParticipantIds = allParticipants.map(p => p.participant_id);
    
    // 7. Update team_id for all participants (including leader)
    const { error: updateError } = await supabase
      .from('participants')
      .update({ team_id: team.team_id })
      .in('participant_id', allParticipantIds);
    
    if (updateError) throw updateError;
    
    return {
      success: true,
      team,
      members: allParticipants
    };
  } catch (error) {
    console.error("Error in team creation:", error);
    throw error;
  }
};

// Add a function to get team members
const getTeamMembers = async (teamId) => {
  const { data, error } = await supabase
    .from('participants')
    .select('participant_id, full_name, email, university')
    .eq('team_id', teamId);
    
  if (error) throw error;
  return data;
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  getTeamMembers
};