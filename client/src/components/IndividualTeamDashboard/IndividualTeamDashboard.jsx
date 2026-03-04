import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserProvider";

const IndividualTeamDashboard = () => {
  const [team, setTeam] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    console.log("User in TeamDashboard:", user);
    // Only proceed with fetch when user data is available
    if (!user || !user.team_id) {
      return;
    }

    // Fetch the team and leaderboard data
    const fetchData = async () => {
      try {
        // Fetch team data
        const teamResponse = await fetch(`${import.meta.env.VITE_API_URL}/teams/${user.team_id}`);
        if (!teamResponse.ok) {
          throw new Error(`Error fetching team: ${teamResponse.status}`);
        }
        const teamData = await teamResponse.json();

        // Fetch leaderboard data
        const leaderboardResponse = await fetch(`${import.meta.env.VITE_API_URL}/scores/leaderboard`);
        if (!leaderboardResponse.ok) {
          throw new Error(`Error fetching leaderboard: ${leaderboardResponse.status}`);
        }
        const leaderboardData = await leaderboardResponse.json();

        // Set the states
        setTeam(teamData);
        setLeaderboard(leaderboardData);
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

          <div className="grid grid-cols-2 gap-4">
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
        </div>
      </div>
    </div>
  );
};

export default IndividualTeamDashboard;