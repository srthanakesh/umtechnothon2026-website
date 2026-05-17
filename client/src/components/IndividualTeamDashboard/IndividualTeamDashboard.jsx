import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserProvider";
import axiosInstance from "../../lib/AxiosInstance";

const IndividualTeamDashboard = () => {
  const [team, setTeam] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeRound, setActiveRound] = useState("round1");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const { user } = useUser();

  // Find positioning index context natively matching database string keys
  const currentTeamName = team?.team_name || "";
  const calculatedRank = localLeaderboardData.findIndex(
    (t) => t.team_name.toLowerCase() === currentTeamName.toLowerCase()
  ) + 1;

  // Enforce Top 25 parameter rule bounds (Rank 1 to 25)
  const isTop25 = calculatedRank > 0 && calculatedRank <= 25;

  // Helper utility to check if the current active round contains an invalid/no submission flag
  const targetRoundNumber = activeRound === "round1" ? 1 : 2;
  const currentRoundRows = feedbacks.filter((f) => Number(f.round) === targetRoundNumber);

  // Determine submission status for this round
  const roundStatus = (() => {
    if (currentRoundRows.length === 0) return "no_submission";
    const statuses = currentRoundRows.map((r) => r.submission_status || "valid");
    if (statuses.includes("no_submission")) return "no_submission";
    if (statuses.includes("invalid")) return "invalid";
    return "valid";
  })();

  const invalidRemark = roundStatus === "invalid"
    ? currentRoundRows.find(r => r.submission_status === "invalid")?.judges_feedback || "Submission invalid."
    : "";

  // Parse feedback text blocks cleanly by matching against the table integers (1 or 2)
  const getCurrentRoundFeedback = () => {
    if (roundStatus !== "valid") return [];

    return currentRoundRows.map((row, index) => ({
      judge: `Judge ${index + 1}`,
      comment: row.judges_feedback ? row.judges_feedback.trim() : "No feedback given"
    }));
  };

  const currentRoundFeedback = getCurrentRoundFeedback();

  const handleRound2Click = () => {
    if (!isTop25) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    } else {
      setActiveRound("round2");
    }
  };

  useEffect(() => {
    if (!user || !user.team_id) return;

    const fetchData = async () => {
      try {
        const encodedTeamId = encodeURIComponent(user.team_id);

        const teamResponse = await axiosInstance.get(`/teams/${encodedTeamId}`);
        setTeam(teamResponse.data);

        const leaderboardResponse = await axiosInstance.get(`/scores/leaderboard`);
        setLeaderboard(leaderboardResponse.data);

        const membersResponse = await axiosInstance.get(`/teams/${encodedTeamId}/members`);
        setTeamMembers(membersResponse.data);

        try {
          const feedbackResponse = await axiosInstance.get(`/teams/${encodedTeamId}/feedback`);
          setFeedbacks(feedbackResponse.data);
        } catch (feedbackErr) {
          console.warn("Feedback endpoint missing or returned an error:", feedbackErr);
          setFeedbacks([]);
        }

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

  if (!user) return <p className="text-center text-lg mt-8 text-white">Loading user data...</p>;
  if (!user.team_id) {
    return (
      <p className="text-center text-lg mt-8 text-white">
        You are not assigned to any team. <br />
        If you just registered a team, you may need to log out and re-login again.
      </p>
    );
  }
  if (loading) return <p className="text-center text-lg mt-8 text-white">Loading team data...</p>;
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;

  return (
    <div className="flex flex-col items-center">
      {/* Embedded Style Injector for neon pulsing keyframes */}
      <style>{`
        .neon-lock-glow {
          animation: lockPulse 1.5s infinite alternate;
        }
        @keyframes lockPulse {
          from { text-shadow: 0 0 2px #e151af, 0 0 8px #e151af; opacity: 0.7; }
          to { text-shadow: 0 0 6px #e151af, 0 0 16px #e151af; opacity: 1; }
        }
      `}</style>

      <h2 className="text-3xl font-black text-[#fafdff] mb-6 uppercase tracking-tighter italic">
        Team Dashboard
      </h2>

      <div className="bg-[#111827] border border-white/10 shadow-2xl rounded-2xl p-8 w-full">
        <div className="space-y-6">
          {/* Team Identity */}
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
                {roundStatus === "valid" ? "Judges Feedback" : "Remark"}
              </p>
              {roundStatus === "valid" && (
                <div className="flex bg-[#0b0e14] rounded-xl p-1 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveRound("round1")}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeRound === "round1" ? "bg-[#2dcefb] text-black" : "text-white/50 hover:text-white"
                      }`}
                  >
                    ROUND 1
                  </button>

                  {/* TOP 25 EVALUATION ROUND 2 BUTTON CONTROLLER */}
                  <button
                    type="button"
                    onClick={handleRound2Click}
                    onMouseEnter={() => !isTop25 && setShowTooltip(true)}
                    onMouseLeave={() => !isTop25 && setShowTooltip(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 relative group ${activeRound === "round2" ? "bg-[#2dcefb] text-black" : "text-white/50 hover:text-white"
                      } ${!isTop25 ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    {!isTop25 && (
                      <span className="text-[#e151af] neon-lock-glow font-bold">
                        🔒
                      </span>
                    )}
                    ROUND 2

                    {/* Accessible Informational Tooltip Block */}
                    {!isTop25 && (
                      <div className={`absolute bottom-full mb-2 right-0 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto bg-[#1f2937] border border-white/10 text-gray-300 text-xs font-medium py-2 px-3 rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none transition-opacity duration-300 ${showTooltip ? "opacity-100" : "opacity-0"}`}>
                        Only Top 25 teams can view Round 2 feedback
                      </div>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Content Container (Table view OR Status Message view) */}
            <div className="bg-[#0b0e14] border border-white/5 rounded-xl overflow-hidden">
              {roundStatus === "no_submission" && (
                <div className="px-6 py-12 text-center text-white/60 font-medium tracking-wide italic leading-relaxed">
                  No submission made
                </div>
              )}

              {roundStatus === "invalid" && (
                <div className="flex flex-col">
                  {/* Warning message container */}
                  <div className="bg-red-500/10 border-b border-red-500/30 p-6 text-red-200 text-sm leading-relaxed text-justify">
                    <span className="font-bold text-red-400 uppercase tracking-widest block mb-2 text-center">Important Notice</span>
                    Kindly note that all invalid submissions are determined after careful consideration and multiple rounds of checking, based on the clear guidelines and instructions outlined in the submission form, particularly where the required instructions or requirements were not followed by the team.<br /><br />
                    As such, appeals or repeated requests for reconsideration regarding the validity of submissions will <strong className="text-red-400">NOT</strong> be entertained.
                  </div>

                  {/* Remark display */}
                  <div className="px-6 py-8">
                    <div className="bg-black/30 border border-white/10 rounded-xl p-5 text-gray-300 font-light whitespace-pre-wrap leading-relaxed font-mono text-sm shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                      {invalidRemark}
                    </div>
                  </div>
                </div>
              )}

              {roundStatus === "valid" && (
                <div className="flex flex-col">
                  {/* Warning message container for valid submission */}
                  <div className="bg-[#2dcefb]/10 border-b border-[#2dcefb]/30 p-6 text-white/90 text-sm leading-relaxed text-justify">
                    <span className="font-bold text-white uppercase tracking-widest block mb-2 text-center">Important Notice</span>
                    Important: All marks and rankings have been finalised. Marks will not be disclosed, and no appeals will be entertained.<br /><br />
                    The rankings and feedback provided are intended for learning purposes and to give teams a clearer overview of their performance during the preliminary round, as evaluated by our panel of judges.
                  </div>

                  {/* STANDARD RENDER: Detailed Judges Table mapping */}
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
                        {currentRoundFeedback.length > 0 ? (
                          currentRoundFeedback.map((item, index) => (
                            <tr key={index} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4 text-white font-semibold whitespace-nowrap">
                                {item.judge}
                              </td>
                              <td className="px-6 py-4 text-white/80 whitespace-pre-wrap leading-relaxed">
                                {item.comment}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2" className="px-6 py-12 text-center text-white/40 italic">
                              No feedback for {activeRound === "round1" ? "Round 1" : "Round 2"} yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Local leaderboard state to calculate the Top 25 eligibility manually
const localLeaderboardData = [
  { team_name: "UM EE Innovators" }, { team_name: "EyeScream" }, { team_name: "Engincs" },
  { team_name: "Indecisive" }, { team_name: "sudo rm-rf /" }, { team_name: "#roadtoidp" },
  { team_name: "Learn And Hustle" }, { team_name: "NEW SPACE" }, { team_name: "Terminators" },
  { team_name: "Circuit Guardians" }, { team_name: "Hail Mary" }, { team_name: "Da adah" },
  { team_name: "FEI" }, { team_name: "XM.UM.com" }, { team_name: "8 HOURS OF SLEEP" },
  { team_name: "The Boys" }, { team_name: "The Winning Team" }, { team_name: "shhhhshesh" },
  { team_name: "Cynthesise" }, { team_name: "Full Nibble" }, { team_name: "cocodenut" },
  { team_name: "Chemingos" }, { team_name: "WO DOU BU ZHI DAO" }, { team_name: "The Forecaster" },
  { team_name: "The Fantastic Five" }, // Top 25 Boundary
  // { team_name: "test" } // testing 
];

export default IndividualTeamDashboard;