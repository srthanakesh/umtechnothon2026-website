import { useState } from "react";

//Data
const judgeData = {
  preliminary: [
    { 
    name: "Hun Jia Chong", 
    role: "Tech Lead", 
    org: "Webby group", 
    image: "/PrelimMentorProfile/Hun Jia Chong.jpg" 
    },

    { 
    name: "Joshua Teh", 
    role: "Tech Lead", 
    org: "Webby group", 
    image: "/PrelimMentorProfile/Joshua Teh.jpg" 
    },

    { 
    name: "Jeffrey Chai", 
    role: "Tech Lead", 
    org: "Webby group", 
    image: "/PrelimMentorProfile/Jeffrey Chai.jpg" 
    },
    
    { 
    name: "Nathan, Cheong Yuen Kiat", 
    role: "Head, Product Management", 
    org: "Innov8tif Solutions", 
    image: "/PrelimMentorProfile/Nathan Cheong.png" 
    },
    
    { 
    name: "Tay Jun Ren", 
    role: "Embedded Systems Engineer Team Lead ", 
    org: "Inverta Systems Sdn Bhd", 
    image: "/PrelimMentorProfile/Tay Jun Ren.jpg" 
    },
    
    { 
    name: "Jason Chiu Han Shen", 
    role: "Software Engineer", 
    org: "Payments Network Malaysia (PayNet)", 
    image: "/PrelimMentorProfile/Jason Chiu.jpeg" 
    },
    
    { 
    name: "Hester Lim", 
    role: "AI Product Manager", 
    org: "MoneyLion", 
    image: "/PrelimMentorProfile/Hester Lim.jpeg" 
    },
    
    { 
    name: "Karnan Shanmugam", 
    role: "Embedded Software, BIOS and FW, Linux Driver, Pre-Si and Post-Si development, semiconductor manufacturing", 
    org: "Intel", 
    image: "/PrelimMentorProfile/Karnan Shanmugam.jpg" 
    },
    
    { 
    name: "Siti Aisyah Shamsaimun", 
    role: "Embedded Systems Engineer specializing in system-level development, firmware design, and evaluation of reliable, real-world technical solutions", 
    org: "Turkish Aerospace Malaysia (TUSAS)", 
    image: "/PrelimMentorProfile/Siti Aisyah Shamsaimun.png" 
    },
    
    { 
    name: "Tee Tze Huat", 
    role: "Senior Software Engineer", 
    org: "Mercedes-Benz Tech Malaysia", 
    image: "/PrelimMentorProfile/Tee Tze Huat.png" 
    },
    
    { 
    name: "Siti Syahirah binti Shahrul", 
    role: "Software Testing/QA Engineer", 
    org: "Payments Network Malaysia Sdn. Bhd(PayNet)", 
    image: "/PrelimMentorProfile/Siti Syahirah_Image.JPG" 
    },
    
    { 
    name: "John Tay", 
    role: "IoT/ Founder and President", 
    org: "ChangeMaker Association", 
    image: "/PrelimMentorProfile/John Tay.png" 
    },
    
],
  final: [
    { name: "TBA", role: "Specialist", org: "Organization", image: "https://i.pravatar.cc/300?img=3" },
    { name: "TBA", role: "Specialist", org: "Organization", image: "https://i.pravatar.cc/300?img=4" },
  ]
};

const PersonCard = ({ person }) => (
  <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:border-cyan-500/50 hover:-translate-y-2 shadow-xl">
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative flex flex-col items-center text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30 group-hover:rotate-180 transition-transform duration-1000"></div>
        <img
          src={person.image}
          alt={person.name}
          className="relative w-36 h-36 md:w-40 md:h-40 object-cover rounded-full border-2 border-blue-500 p-1 bg-[#0b1121] shadow-[0_0_15px_rgba(45,206,251,0.5)]"
        />
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#2dcefb] transition-colors">{person.name}</h3>
      <p className="text-[#2dcefb] text-sm md:text-base font-medium tracking-wide mt-1 leading-snug">{person.role}</p>
      <div className="mt-4 pt-4 border-t border-white/5 w-full">
        <p className="text-gray-300 text-sm md:text-base font-medium tracking-wide opacity-90">{person.org}</p>
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