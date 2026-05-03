import { useState } from "react";

//Data
const judgeData = {
  preliminary: Array(12).fill({
    name: "Marcus Vogel", 
    role: "Blockchain Architect", 
    org: "Decentralized Networks", 
    image: "https://i.pravatar.cc/300?img=1" 
  }),
  final: [
    { name: "TBA", role: "Specialist", org: "Organization", image: "https://i.pravatar.cc/300?img=3" },
    { name: "TBA", role: "Specialist", org: "Organization", image: "https://i.pravatar.cc/300?img=4" },
  ]
};

const PersonCard = ({ person }) => (
  <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:border-cyan-500/50 hover:-translate-y-2 shadow-xl">
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative flex flex-col items-center text-center">
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30 group-hover:rotate-180 transition-transform duration-1000"></div>
        <img
          src={person.image}
          alt={person.name}
          className="relative w-28 h-28 object-cover rounded-full border-2 border-blue-500 p-1 bg-[#0b1121]"
        />
      </div>
      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{person.name}</h3>
      <p className="text-cyan-400 text-xs font-mono uppercase tracking-tighter mt-1">{person.role}</p>
      <div className="mt-4 pt-4 border-t border-white/5 w-full">
        <p className="text-gray-400 text-xs font-medium uppercase tracking-widest opacity-80">{person.org}</p>
      </div>
    </div>
  </div>
);

const JudgesSection = () => {
  const [activeTab, setActiveTab] = useState("preliminary");
  const isFinal = activeTab === "final";

  return (
    <section className="relative pt-20 pb-10 px-6 md:px-20 bg-[#0b1121] text-center isolate z-10 border-none">
      
      <div className="relative w-full max-w-5xl mx-auto mb-20">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#60a5fa] to-transparent"></div>
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent blur-[2px] opacity-80"></div>
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-white tracking-widest mb-6 uppercase">Judges</h2>
      <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-16">
        Industry leaders evaluating UM Technothon 2026.
      </p>

      {/* Tabs */}
      <div className="flex justify-center gap-12 mb-16 text-sm tracking-widest uppercase relative z-20">
        <button 
          onClick={() => setActiveTab("preliminary")} 
          className={`pb-2 transition ${activeTab === "preliminary" ? "text-cyan-400 border-b-2 border-cyan-400 font-semibold" : "text-gray-400 hover:text-white"}`}
        >
          Preliminary Round
        </button>
        <button 
          onClick={() => setActiveTab("final")} 
          className={`pb-2 transition ${activeTab === "final" ? "text-cyan-400 border-b-2 border-cyan-400 font-semibold" : "text-gray-400 hover:text-white"}`}
        >
          Final Round
        </button>
      </div>

      <div className="relative min-h-[400px]">
        {isFinal && (
          <div className="absolute -inset-10 z-50 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-[#0b1121]/60 backdrop-blur-xl pointer-events-none" />
            <div className="relative z-50 bg-[#050914]/95 border border-cyan-500/30 p-10 md:p-14 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.2)] pointer-events-auto">
              <span className="text-cyan-400 text-xs font-mono tracking-[0.4em] uppercase mb-4 block">Final Round</span>
              <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight text-center">
                REVEALING <br/> <span className="text-cyan-400 animate-pulse">SOON</span>
              </h3>
            </div>
          </div>
        )}

        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto pb-10 transition-all duration-500 ${isFinal ? 'opacity-20 blur-sm' : 'opacity-100'}`}>
          {judgeData[activeTab].map((person, index) => (
            <PersonCard key={index} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JudgesSection;