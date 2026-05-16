const mentors = [
  { 
    name: "Tay Jun Ren", 
    role: "Embedded Systems Engineer Team Lead", 
    org: "Invertra Systems Sdn Bhd", 
    image: "/PrelimMentorProfile/Tay Jun Ren.jpg" 
  },
  { 
    name: "John Tay", 
    role: "IoT/ Founder and President", 
    org: "ChangeMaker Association", 
    image: "/PrelimMentorProfile/John Tay.png" 
  },
  { 
    name: "Jeffrey Chai", 
    role: "Tech Lead", 
    org: "Webby Group", 
    image: "/PrelimMentorProfile/Jeffrey Chai.jpg" 
  },
  { 
    name: "Hun Jia Cong", 
    role: "Tech Lead", 
    org: "Webby Group", 
    image: "/PrelimMentorProfile/Hun Jia Chong.jpg" 
  },
  { 
    name: "Karnan Shanmugam", 
    role: "Director of Engineering - Embedded Software, BIO", 
    org: "Intel", 
    image: "/PrelimMentorProfile/Karnan Shanmugam.jpg" 
  },
];

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

const MentorsSection = () => (
  <section className="relative pt-20 pb-20 px-6 md:px-20 bg-[#0b1121] text-center isolate z-10 border-none shadow-none">
    
    <div className="relative w-full max-w-5xl mx-auto mb-20">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#60a5fa] to-transparent"></div>
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent blur-[2px] opacity-80"></div>
    </div>

    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-widest mb-16 uppercase">Mentors</h2>
    <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-16">
        Meet the innovators guiding UM Technothon 2026.
      </p>
    <div className="relative min-h-[400px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto pb-10 transition-all duration-500 opacity-100">
        {mentors.map((person, index) => (
          <PersonCard key={index} person={person} />
        ))}
      </div>
    </div>
  </section>
);

export default MentorsSection;