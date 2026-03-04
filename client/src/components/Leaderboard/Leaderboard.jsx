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
    <div className="bg-[#0b0e14] min-h-screen p-6 md:p-12 text-center" id="leaderboard">
      <h2 className="text-4xl font-black text-[#fafdff] mb-4 tracking-tighter italic uppercase">
        Leaderboard
      </h2>
      <div className="w-5/6 h-1.5 bg-[#e151af] rounded-full mx-auto mb-12 shadow-[0_0_15px_#e151af]"></div>
      
      <div className="max-w-4xl mx-auto bg-[#111827] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#2dcefb]/10 text-[#2dcefb] uppercase text-sm tracking-widest">
              <th className="px-6 py-5 text-center font-black">Rank</th>
              <th className="px-6 py-5 text-left font-black">Group Name</th>
              <th className="px-6 py-5 text-center font-black">Total Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leaderboard.map((team, index) => (
              <tr
                key={index}
                className={`transition-colors hover:bg-white/5 group ${
                  index === 0 ? "bg-[#e151af]/5" : ""
                }`}
              >
                <td className="px-6 py-5 text-center">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                    index === 0 ? "bg-[#e151af] text-white shadow-[0_0_10px_#e151af]" : 
                    index === 1 ? "bg-slate-400 text-[#0b0e14]" :
                    index === 2 ? "bg-amber-600 text-[#0b0e14]" : "text-white/40"
                  }`}>
                    {index + 1}
                  </span>
                </td>
                <td className="px-6 py-5 text-left font-semibold text-[#fafdff]">
                  {team.team_name}
                </td>
                <td className="px-6 py-5 text-center font-mono text-xl text-[#2dcefb] group-hover:scale-110 transition-transform">
                  {team.total_score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {leaderboard.length === 0 && (
          <div className="p-10 text-white/20 italic">
            Waiting for scores to be finalized...
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
