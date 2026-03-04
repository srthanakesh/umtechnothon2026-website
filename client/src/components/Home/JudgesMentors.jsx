import { useState } from "react";

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

      <h3 className="mt-6 text-xl font-semibold text-white">
      {person.name}
      </h3>

      <p className="text-blue-400 text-sm mt-1 uppercase tracking-wide">
      {person.role}
      </p>

      <p className="text-gray-400 text-sm mt-3 max-w-xs">
        {person.bio}
       </p>
      </div>
    );
  
  const [activeTab, setActiveTab] = useState("judges");
  return (
    <section className="relative py-28 px-6 md:px-20 bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0f172a] text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-white tracking-widest">
        JUDGES & MENTORS
       </h2>

       <div className="w-24 h-1 mx-auto bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-4 mb-6"></div>

      <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-20">
      Meet the industry leaders and innovators guiding UM Technothon 2026.
      </p>
      
      <div className="flex justify-center gap-12 mb-16 text-sm tracking-widest uppercase">
      <button
       onClick={() => setActiveTab("judges")}
       className={`pb-2 transition ${
      activeTab === "judges"
        ? "text-cyan-400 border-b-2 border-cyan-400 font-semibold"
        : "text-gray-400 hover:text-white"
       }`}
       >
         Judges
       </button>

      <button
      onClick={() => setActiveTab("mentors")}
      className={`pb-2 transition ${
      activeTab === "mentors"
        ? "text-cyan-400 border-b-2 border-cyan-400 font-semibold"
        : "text-gray-400 hover:text-white"
       }`}
      >
       Mentors
     </button>
     </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 transition-all duration-500">
      {(activeTab === "judges" ? judges : mentors).map((person, index) => (
       <PersonCard key={index} person={person} />
      ))}
      </div>

     </section>
       
      );
     };

export default JudgesMentors;