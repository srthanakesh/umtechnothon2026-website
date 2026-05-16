import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserProvider";
import axiosInstance from "../../lib/AxiosInstance";

const round1FeedbackData = [
  {
    teamName: "Indecisive",
    feedbacks: [
      {
        judge: "Judge 1",
        comment: "Clever repurposing of Wi-Fi as occupancy sensor."
      },
      {
        judge: "Judge 2",
        comment: "CSI processing algorithm needs clearer explanation."
      }
    ]
  }
];

const round2FeedbackData = [
  {
    teamName: "test",
    feedbacks: [
      {
        judge: "Judge 1",
        comment: "Excellent improvements from Round 1."
      },
      {
        judge: "Judge 2",
        comment: "Excellent improvements from Round 1."
      },
      {
        judge: "Judge 3",
        comment: "Excellent improvements from Round 1."
      },
      {
        judge: "Judge 4",
        comment: "Excellent improvements from Round 1."
      },
      {
        judge: "Judge 5",
        comment: "Excellent improvements from Round 1."
      },
      {
        judge: "Judge 6",
        comment: "Excellent improvements from Round 1."
      },
      {
        judge: "Judge 7",
        comment: "Excellent improvements from Round 1."
      },
      {
        judge: "Judge 8",
        comment: "Excellent improvements from Round 1."
      },
      {
        judge: "Judge 9",
        comment: "Excellent improvements from Round 1."
      },
    ]
  }
];

const IndividualTeamDashboard = () => {
const [team, setTeam] = useState(null);
const [leaderboard, setLeaderboard] = useState([]);
const [teamMembers, setTeamMembers] = useState([]);
const [activeRound, setActiveRound] = useState("round1");
const [error, setError] = useState("");
const [loading, setLoading] = useState(true);
const { user } = useUser();

const currentRound1Feedback =
round1FeedbackData.find(
  item => item.teamName === team?.team_name
)||{ feedbacks:[]};  

const currentRound2Feedback =
round2FeedbackData.find(
  item => item.teamName === team?.team_name
)||{ feedbacks:[]};  

const finalistTeams = [
  "test",
];

const isFinalist = finalistTeams.includes(team?.team_name);
const hasRound2 = !!currentRound2Feedback.feedbacks.length || isFinalist;

useEffect(() => {
    // Only proceed with fetch when user data is available
    if (!user || !user.team_id) {
      return;
    }

    // Fetch the team, leaderboard, and members data
    const fetchData = async () => {
      try {
        // Fetch team data
        const encodedTeamId = encodeURIComponent(user.team_id);
        const teamResponse = await axiosInstance.get(`/teams/${encodedTeamId}`);
        setTeam(teamResponse.data);

        // Fetch leaderboard data
        const leaderboardResponse = await axiosInstance.get(`/scores/leaderboard`);
        setLeaderboard(leaderboardResponse.data);

        // Fetch team members
        const membersResponse = await axiosInstance.get(`/teams/${encodedTeamId}/members`);
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

          {/* Judges Feedback */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[#2dcefb] text-xs font-bold uppercase tracking-widest">
               Judges Feedback
              </p>
             <div className="flex bg-[#0b0e14] rounded-xl p-1 border border-white/10">

             {/* ROUND 1 BUTTON */}
             <button
                onClick={() => setActiveRound("round1")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeRound === "round1"
                 ? "bg-[#2dcefb] text-black"
                 : "text-white/50 hover:text-white"
                }`}               
              >
              ROUND 1
              </button>
 
             {/* ROUND 2 BUTTON */}
             <button
               onClick={() => isFinalist && setActiveRound("round2")}
               disabled={!isFinalist}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
               activeRound === "round2"
                ? "bg-[#2dcefb] text-black"
                : "text-white/50 hover:text-white"
               } ${!isFinalist ? "opacity-40 cursor-not-allowed" : ""}`}
             >
             {!isFinalist && "🔒"}
             ROUND 2
             </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-[#0b0e14] border border-white/5 rounded-xl overflow-hidden">
           
           <div className="max-h-[400px] overflow-y-auto overflow-x-auto relative">
             <table className="w-full">
                <thead className="sticky top-0 z-20 bg-[#131c2f]/95 backdrop-blur-md">
                 <tr>
                    <th className="px-6 py-4 text-left text-[#2dcefb] text-xs uppercase tracking-widest bg-[#131c2f]/95">
                     Entry
                    </th>
                   <th className="px-6 py-4 text-left text-[#2dcefb] text-xs uppercase tracking-widest bg-[#131c2f]/95">
                     Judges Comments
                    </th>
                 </tr>
               </thead>

               <tbody>
                 {(activeRound === "round1"
                   ? currentRound1Feedback?.feedbacks
                   : currentRound2Feedback?.feedbacks
                  )?.length > 0 ? (
                   (activeRound === "round1"
                     ? currentRound1Feedback?.feedbacks
                     : currentRound2Feedback?.feedbacks
                    ).map((item, index) => (
                     <tr
                       key={index}
                       className="border-t border-white/5 hover:bg-white/5 transition-colors"
                      >
                       <td className="px-6 py-4 text-white font-semibold whitespace-nowrap">
                         {item.judge}
                        </td>
                       <td className="px-6 py-4 text-white/80 whitespace-pre-wrap leading-relaxed">
                         {item.comment || "No feedback given"}
                        </td>
                     </tr>
                    ))
                  ) : (
                        <tr>
                         <td
                           colSpan="2"
                           className="px-6 py-12 text-center text-white/40 italic"
                          >
                           No feedback for {activeRound === "round1" ? "Round 1" : "Round 2"} yet.
                         </td>
                        </tr>
                       )}
               </tbody>
             </table>
            </div>
           </div>
         </div>
       </div>
     </div>
    </div>
  );
};

export default IndividualTeamDashboard;