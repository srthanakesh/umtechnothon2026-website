import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/scores/leaderboard`
        );
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="bg-[#ffffff00] p-12 text-center" id="leaderboard">
      <h2 className="text-3xl font-bold text-[#4c5ab6] mb-8">LEADERBOARD</h2>
      <div className="w-5/6 h-1 bg-[#7f8bcb] rounded mx-auto mb-10"></div>
      <div className="max-w-5xl mx-auto bg-white p-5 rounded-2xl border-4 border-[#7f8bcb] shadow-lg">
        <table className="table-auto mx-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center">Rank</th>
              <th className="px-4 py-2 text-left">Group Name</th>
              <th className="px-4 py-2 text-center">Total Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((team, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}`}
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-left">{team.team_name}</td>
                <td className="px-4 py-2 text-center">{team.total_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
