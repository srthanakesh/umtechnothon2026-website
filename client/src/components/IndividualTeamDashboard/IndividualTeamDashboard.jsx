import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserProvider";
import axiosInstance from "../../lib/AxiosInstance";

const IndividualTeamDashboard = () => {
  const [team, setTeam] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    // Only proceed with fetch when user data is available
    if (!user || !user.team_id) {
      return;
    }

    // Fetch the team, leaderboard, and members data
    const fetchData = async () => {
      try {
        // Fetch team data
        const teamResponse = await axiosInstance.get(`/teams/${user.team_id}`);
        setTeam(teamResponse.data);

        // Fetch leaderboard data
        const leaderboardResponse = await axiosInstance.get(`/scores/leaderboard`);
        setLeaderboard(leaderboardResponse.data);

        // Fetch team members
        const membersResponse = await axiosInstance.get(`/teams/${user.team_id}/members`);
        setTeamMembers(membersResponse.data);

        setError("");
      } catch (err) {
        setError(`Failed to fetch data: ${err.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Find the team's rank in the leaderboard
  const getTeamRank = () => {
    if (!team || !leaderboard.length) return "Not ranked yet";

    const teamIndex = leaderboard.findIndex(item => item.team_name === team.team_name);
    return teamIndex !== -1 ? `#${teamIndex + 1}` : "Not ranked yet";
  };

  // Get the team's score from the leaderboard
  const getTeamScore = () => {
    if (!team || !leaderboard.length) return "No score yet";

    const teamEntry = leaderboard.find(item => item.team_name === team.team_name);
    return teamEntry ? teamEntry.total_score : "No score yet";
  };

  if (!user) {
    return <p className="text-center text-lg mt-8 text-white">Loading user data...</p>;
  }

  if (!user.team_id) {
    return <p className="text-center text-lg mt-8 text-white">You are not assigned to any team. <br></br>
      If you just registered a team, <br></br>
      you may need to log out and re-login again.</p>;
  }

  if (loading) {
    return <p className="text-center text-lg mt-8 text-white">Loading team data...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-black text-[#fafdff] mb-6 uppercase tracking-tighter italic">
        Team Dashboard
      </h2>

      <div className="bg-[#111827] border border-white/10 shadow-2xl rounded-2xl p-8 w-full">
        <div className="space-y-6">
          {/* Team Name */}
          <div>
            <p className="text-[#2dcefb] text-xs font-bold uppercase tracking-widest mb-2">Team Identity</p>
            <div className="bg-[#0b0e14] border border-white/5 rounded-xl p-4 text-white text-xl font-bold italic tracking-tight">
              {team?.team_name || "Not available"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Rank Display */}
            <div className="bg-[#0b0e14] border border-white/5 rounded-xl p-6 text-center">
              <p className="text-[#e151af] text-xs font-bold uppercase mb-2">Current Rank</p>
              <div className="text-4xl font-black text-[#fafdff]">{getTeamRank()}</div>
            </div>

            {/* Score Display */}
            <div className="bg-[#2dcefb]/5 border border-[#2dcefb]/20 rounded-xl p-6 text-center shadow-[0_0_15px_rgba(45,206,251,0.1)]">
              <p className="text-[#2dcefb] text-xs font-bold uppercase mb-2">Total Points</p>
              <div className="text-4xl font-black text-[#2dcefb]">{getTeamScore()}</div>
            </div>
          </div>

          {/* Team Members List */}
          <div className="mt-8">
            <p className="text-[#2dcefb] text-xs font-bold uppercase tracking-widest mb-3">Team Members</p>
            <div className="bg-[#0b0e14] border border-white/5 rounded-xl overflow-hidden">
              {teamMembers && teamMembers.length > 0 ? (
                <div className="divide-y divide-white/10">
                  {teamMembers.map((member) => (
                    <div key={member.participant_id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                      <div>
                        <p className="text-white font-semibold flex items-center gap-2">
                          {member.full_name}
                          {member.is_leader && (
                            <span className="bg-[#e151af] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider">
                              Leader
                            </span>
                          )}
                        </p>
                        <p className="text-white/50 text-sm">{member.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/70 text-sm whitespace-nowrap">{member.university}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-white/50 italic">
                  No members found for this team.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualTeamDashboard;