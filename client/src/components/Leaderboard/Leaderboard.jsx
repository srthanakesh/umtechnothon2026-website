import React, { useState } from "react";

const Leaderboard = () => {
  // Mock Data
  const [leaderboard] = useState([
    //Valid
    { team_name: "UM EE Innovators", is_valid: true},
    { team_name: "EyeScream", is_valid: true},
    { team_name: "Engincs", is_valid: true},
    { team_name: "Indecisive", is_valid: true},
    { team_name: "sudo rm-rf /", is_valid: true},
    { team_name: "#roadtoidp", is_valid: true},
    { team_name: "Learn And Hustle", is_valid: true},
    { team_name: "NEW SPACE", is_valid: true},
    { team_name: "Terminators", is_valid: true},
    { team_name: "Circuit Guardians", is_valid: true},
    { team_name: "Hail Mary", is_valid: true},
    { team_name: "Da adah", is_valid: true},
    { team_name: "FEI", is_valid: true},
    { team_name: "XM.UM.com", is_valid: true},
    { team_name: "8 HOURS OF SLEEP", is_valid: true},
    { team_name: "The Boys", is_valid: true},
    { team_name: "The Winning Team", is_valid: true},
    { team_name: "shhhhshesh", is_valid: true},
    { team_name: "Cynthesise", is_valid: true},
    { team_name: "Full Nibble", is_valid: true},
    { team_name: "cocodenut", is_valid: true},
    { team_name: "Chemingos", is_valid: true},
    { team_name: "WO DOU BU ZHI DAO", is_valid: true},
    { team_name: "The Forecaster", is_valid: true},
    { team_name: "The Fantastic Five", is_valid: true},
    { team_name: "Elsa Let It Flow", is_valid: true},
    { team_name: "SignWave", is_valid: true},
    { team_name: "Small black", is_valid: true},
    { team_name: "Jet5Holiday", is_valid: true},
    { team_name: "APUGG", is_valid: true},
    { team_name: "discere", is_valid: true},
    { team_name: "Spheniscidae", is_valid: true},
    { team_name: "Chung Ling Butterworth", is_valid: true},
    { team_name: "JnP", is_valid: true},
    { team_name: "Ping if OHM", is_valid: true},
    { team_name: "Oreo Stuff²", is_valid: true},
    { team_name: "CYB_AI", is_valid: true},
    { team_name: "CocaCola", is_valid: true},
    { team_name: "TechsIT", is_valid: true},
    { team_name: "m", is_valid: true},
    { team_name: "404 : tech titan", is_valid: true},
    { team_name: "Solution Sculptors", is_valid: true},
    { team_name: "Try2Know", is_valid: true},
    { team_name: "KMS not kms", is_valid: true},
    { team_name: "BeBetter", is_valid: true},
    { team_name: "Scubamaxxers", is_valid: true},
    { team_name: "SP Potato", is_valid: true},
    { team_name: "3CS1E", is_valid: true},
    { team_name: "Tart Nenas", is_valid: true},
    { team_name: "Wan Tan Mee", is_valid: true},
    { team_name: "Water Lily-Shapla", is_valid: true},
    { team_name: "Cavs UTHM", is_valid: true},
    { team_name: "Breezy Bowl", is_valid: true},
    { team_name: "Taylor's Duck", is_valid: true},
    { team_name: "Tech Enthusiasts", is_valid: true},
    { team_name: "Heterosapiens", is_valid: true},
    { team_name: "unemployed", is_valid: true},
    { team_name: "TechEngineers", is_valid: true},
    { team_name: "XMUM TOP 5", is_valid: true},
    { team_name: "Volta", is_valid: true},
    { team_name: "The Phoenixes", is_valid: true},
    { team_name: "XGLIN", is_valid: true},
    { team_name: "Sunway Dodecahedron", is_valid: true},
    { team_name: "404_ERROR", is_valid: true},
    { team_name: "BIG WHITE", is_valid: true},
    { team_name: "Rocky", is_valid: true},
    { team_name: "Neural Ninjas", is_valid: true},
    { team_name: "Titan5", is_valid: true},
    { team_name: "Hikma", is_valid: true},
    { team_name: "waste2worth", is_valid: true},
    { team_name: "Learn2win", is_valid: true},
    { team_name: "Synergy Minds", is_valid: true},
    { team_name: "oklah", is_valid: true},
    { team_name: "123", is_valid: true},
    
    //Invalid
    { team_name: "CluadeOSS", is_valid: false},
    { team_name: "New Aero Vanguards", is_valid: false},
    { team_name: "We’ll Fix It in Production", is_valid: false},
    { team_name: "SugarH₂O", is_valid: false},
    { team_name: "Switch", is_valid: false},
    { team_name: "Eliza", is_valid: false},
    
    //No submission
    { team_name: "Teapot", none: true},
    { team_name: "Straw Hat Pirates", none: true},
    { team_name: "donzo", none: true},
    { team_name: "Asal Boleh Jalan", none: true},
    { team_name: "Nexus", none: true},
    { team_name: "Hehe", none: true},
    { team_name: "1Dev", none: true},
    { team_name: "We reborn, this time we will give it our all.", none: true},
  ]);

  const validSubmissions = leaderboard
    .filter(t => t.is_valid === true);

  const invalidSubmissions = leaderboard.filter(t => t.is_valid === false);
  const noSubmissions = leaderboard.filter(t => t.none === true);

  const SectionTitle = ({ title }) => (
    <div className="mt-12 mb-6 flex items-center gap-4">
      <h3 className="text-[#2dcefb] text-xs font-bold uppercase tracking-[0.3em] pl-2">{title}</h3>
      <div className="flex-1 h-px bg-white/10"></div>
    </div>
  );

  return (
    <div className="bg-[#0b0e14] min-h-screen p-6 md:p-12 text-center font-sans">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #2dcefb; 
          border-radius: 10px;
          box-shadow: 0 0 10px #2dcefb;
        }
      `}</style>

      <h2 className="text-4xl font-black text-[#fafdff] mb-4 tracking-tighter italic uppercase">
        Leaderboard
      </h2>
      <div className="w-5/6 h-1.5 bg-[#e151af] rounded-full mx-auto mb-12 shadow-[0_0_15px_#e151af]"></div>

      <div className="max-w-3xl mx-auto text-left">
        
        {/* VALID SECTION */}
        <SectionTitle title="Official Rankings" />
        <div className="bg-[#111827] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Header remains static */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#2dcefb]/5 text-[#2dcefb] uppercase text-[10px] tracking-widest border-b border-white/5">
                <th className="px-8 py-4 text-center font-black w-24">Rank</th>
                <th className="px-6 py-4 text-left font-black">Group Name</th>
              </tr>
            </thead>
          </table>
          
          {/* Scrollable Container */}
          <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
            <table className="w-full border-collapse">
              <tbody className="divide-y divide-white/5">
                {validSubmissions.map((team, index) => (
                  <tr key={index} className="transition-colors hover:bg-white/5">
                    <td className="px-8 py-6 text-center text-[#fafdff] text-xl font-black italic tracking-tighter w-24">
                      {index + 1}
                    </td>
                    <td className="px-6 py-6 text-left text-[#fafdff] text-xl font-black italic tracking-tighter uppercase">
                      {team.team_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* INVALID SECTION */}
        {invalidSubmissions.length > 0 && (
          <>
            <SectionTitle title="Invalid" />
            <div className="space-y-3">
              {invalidSubmissions.map((team, idx) => (
                <div key={idx} className="bg-[#111827]/40 border border-red-500/20 rounded-xl px-8 py-4 flex justify-between items-center">
                  <span className="text-white/40 text-lg font-bold italic uppercase">{team.team_name}</span>
                  <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">Disqualified</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* NO SUBMISSION SECTION */}
        {noSubmissions.length > 0 && (
          <>
            <SectionTitle title="No Submission" />
            <div className="space-y-3">
              {noSubmissions.map((team, idx) => (
                <div key={idx} className="bg-[#111827]/40 border border-red-500/20 rounded-xl px-8 py-4 flex justify-between items-center">
                  <span className="text-white/40 text-lg font-bold italic uppercase">{team.team_name}</span>
                  <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">N/A</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;