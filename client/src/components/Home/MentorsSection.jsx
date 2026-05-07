const mentors = [
  { name: "Elena Sokolov", role: "Venture Capitalist", org: "Deep Tech VC", image: "https://i.pravatar.cc/300?img=4" },
  { name: "David Park", role: "Full Stack Developer", org: "Cloud Systems Inc", image: "https://i.pravatar.cc/300?img=5" },
  { name: "Linda Wu", role: "Cybersecurity Lead", org: "Zero Trust Arch", image: "https://i.pravatar.cc/300?img=6" },
];

const SHOW_MENTOR_OVERLAY = true;

const PersonCard = ({ person }) => (
  <div className="flex flex-col items-center group">
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
    <p className="text-gray-400 text-xs mt-1 uppercase opacity-80">{person.org}</p>
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
      {SHOW_MENTOR_OVERLAY && (
        <div className="absolute -inset-10 z-50 flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-[#0b1121]/60 backdrop-blur-xl pointer-events-none" />
          <div className="relative z-50 bg-[#050914]/95 border border-cyan-500/30 p-10 md:p-14 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.2)] pointer-events-auto">
            <span className="text-cyan-400 text-xs font-mono tracking-[0.4em] uppercase mb-4 block">Mentors</span>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
              REVEALING <br/> <span className="text-cyan-400 animate-pulse">SOON</span>
            </h3>
          </div>
        </div>
      )}

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto transition-all duration-500 ${SHOW_MENTOR_OVERLAY ? 'opacity-20 blur-sm' : 'opacity-100'}`}>
        {mentors.map((person, index) => (
          <PersonCard key={index} person={person} />
        ))}
      </div>
    </div>
  </section>
);

export default MentorsSection;