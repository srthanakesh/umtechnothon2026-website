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
    role: "Director of Engineering - Embedded Software and IP | Embedded Software, BIOS and FW, Linux Driver, Pre-Si and Post-Si development, semiconductor manufacturing", 
    org: "", 
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
    { 
      name: "Joshua Teh", 
      role: "Tech Lead", 
      org: "Webby Group", 
      image: "/PrelimMentorProfile/Joshua Teh.jpg" 
    },
    { 
      name: "Abel Saw Ze Chuen", 
      role: "Group Chief Transformation Officer", 
      org: "Chin Hin Group Berhad", 
      image: "/PrelimMentorProfile/Abel Saw.jpeg" 
    },
    { 
      name: "Siti Aisyah Shamsaimun", 
      role: "Embedded Systems Engineer specializing in system-level development, firmware design, and evaluation of reliable, real-world technical solutions", 
      org: "Turkish Aerospace Malaysia (TUSAS)", 
      image: "/PrelimMentorProfile/Siti Aisyah Shamsaimun.png" 
    },
  ]
};

const PersonCard = ({ person }) => (
  <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:border-cyan-500/50 hover:-translate-y-2 shadow-xl w-full max-w-[280px]">
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
        <div className={`flex flex-wrap justify-center gap-8 max-w-7xl mx-auto pb-10 transition-all duration-500 opacity-100`}>
          {judgeData[activeTab].map((person, index) => (
            <PersonCard key={index} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JudgesSection;