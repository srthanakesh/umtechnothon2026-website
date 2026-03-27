import { useState } from "react";

// SET THIS TO FALSE TO HIDE THE OVERLAY
const SHOW_OVERLAY = true;

const judges = [
  {
    name: "Marcus Vogel",
    role: "Blockchain Architect",
    bio: "Leading infrastructure design at decentralized networks.",
    image: "https://i.pravatar.cc/300?img=1",
  },
  {
    name: "Sarah Chen",
    role: "Head of Design",
    bio: "Specializing in spatial computing and Web3.",
    image: "https://i.pravatar.cc/300?img=2",
  },
  {
    name: "Alex Rivera",
    role: "Senior AI Researcher",
    bio: "Pioneer in neural network optimization.",
    image: "https://i.pravatar.cc/300?img=3",
  },
];

const mentors = [
  {
    name: "Elena Sokolov",
    role: "Venture Capitalist",
    bio: "Focused on early-stage deep tech startups.",
    image: "https://i.pravatar.cc/300?img=4",
  },
  {
    name: "David Park",
    role: "Full Stack Developer",
    bio: "Expert in scalable cloud systems.",
    image: "https://i.pravatar.cc/300?img=5",
  },
  {
    name: "Linda Wu",
    role: "Cybersecurity Lead",
    bio: "Dedicated to zero-trust architecture.",
    image: "https://i.pravatar.cc/300?img=6",
  },
];

const JudgesMentors = () => {
  const [activeTab, setActiveTab] = useState("judges");

  const PersonCard = ({ person }) => (
    <div className="flex flex-col items-center group transition duration-500">
      <div className="relative">
        <div className="absolute inset-0 rounded-full blur-xl bg-cyan-400/30 opacity-0 group-hover:opacity-100 transition duration-500"></div>
        <img
          src={person.image}
          alt={person.name}
          className="relative w-36 h-36 object-cover rounded-full border-4 border-blue-500 group-hover:border-cyan-400 transition duration-500"
        />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-white">{person.name}</h3>
      <p className="text-blue-400 text-sm mt-1 uppercase tracking-wide">{person.role}</p>
      <p className="text-gray-400 text-sm mt-3 max-w-xs">{person.bio}</p>
    </div>
  );

  return (
    /* Added isolate and z-10: This "traps" the overlay inside this section 
       without needing extra wrapper divs that shift positions. */
    <section className="relative py-20 px-6 md:px-20 bg-[#0b1121] text-center isolate z-10">
      
      <div className="relative w-full max-w-5xl mx-auto mb-10">
        <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-transparent via-[#60a5fa] to-transparent"></div>
        <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent blur-[2px] opacity-80"></div>
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-white tracking-widest mb-6 uppercase">
        Judges & Mentors
      </h2>

      <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-16">
        Meet the industry leaders and innovators guiding UM Technothon 2026.
      </p>
      
      <div className="flex justify-center gap-12 mb-16 text-sm tracking-widest uppercase">
        <button onClick={() => setActiveTab("judges")} className={`pb-2 transition ${activeTab === "judges" ? "text-cyan-400 border-b-2 border-cyan-400 font-semibold" : "text-gray-400 hover:text-white"}`}>Judges</button>
        <button onClick={() => setActiveTab("mentors")} className={`pb-2 transition ${activeTab === "mentors" ? "text-cyan-400 border-b-2 border-cyan-400 font-semibold" : "text-gray-400 hover:text-white"}`}>Mentors</button>
      </div>

      {/* The Grid: Original structure restored to prevent shifting */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 transition-all duration-500 relative">
        
        {SHOW_OVERLAY && (
          /* Using fixed inset-0 relative to the grid, but with isolation on the section */
          <div className="absolute -inset-10 z-50 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-[#0b1121]/60 backdrop-blur-xl pointer-events-none" />
            
            <div className="relative z-50 bg-[#050914]/95 border border-cyan-500/30 p-10 md:p-14 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.2)] pointer-events-auto">
               <span className="text-cyan-400 text-xs font-mono tracking-[0.4em] uppercase mb-4 block">{activeTab}</span>
               <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                REVEALING <br/> 
                <span className="text-cyan-400 animate-pulse">SOON</span>
              </h3>
            </div>
          </div>
        )}

        {(activeTab === "judges" ? judges : mentors).map((person, index) => (
          <PersonCard key={index} person={person} />
        ))}
      </div>
    </section>
  );
};

export default JudgesMentors;