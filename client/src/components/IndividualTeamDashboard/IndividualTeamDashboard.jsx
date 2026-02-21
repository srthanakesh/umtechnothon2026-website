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
    return <p className="text-center text-lg mt-8">Loading user data...</p>;
  }

  if (!user.team_id) {
    return <p className="text-center text-lg mt-8">You are not assigned to any team. <br></br>
      If you just registered a team, <br></br>
      you may need to log out and re-login again.</p>;
  }

  if (loading) {
    return <p className="text-center text-lg mt-8">Loading team data...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#ffffff00]">
      {/* Title Outside the White Rectangle */}
      <h2 className="text-4xl font-bold text-black mb-6">TEAM DASHBOARD</h2>

      {/* White Rectangle */}
      <div className="bg-[#efece6] shadow-md rounded-lg p-8 max-w-xl w-full mt-4">
        <div className="space-y-6">
          {/* Team Name */}
          <div>
            <p className="text-gray-700 font-semibold">Team Name:</p>
            <div className="bg-white shadow-md rounded-lg p-4 max-w-xl w-full h-12 flex items-center">
              {team?.team_name || "Not available"}
            </div>
          </div>
          {/* Rank */}
          <div>
            <p className="text-gray-700 font-semibold">Rank:</p>
            <div className="bg-white shadow-md rounded-lg p-4 max-w-xl w-full h-12 flex items-center">
              {getTeamRank()}
            </div>
          </div>
          {/* Total Score */}
          <div>
            <p className="text-gray-700 font-semibold">Total Score:</p>
            <div className="bg-white shadow-md rounded-lg p-4 max-w-xl w-full h-12 flex items-center">
              {getTeamScore()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualTeamDashboard;