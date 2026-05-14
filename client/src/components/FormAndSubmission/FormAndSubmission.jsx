import React, { useState, useEffect } from 'react';
import { useUser } from "../../context/UserProvider";

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

const FormAndSubmission = () => {
  const { user } = useUser();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClosed, setIsClosed] = useState(false);

  // Countdown to June 5, 2026 11:59 PM (GMT+8)
  useEffect(() => {
    const deadline = new Date('2026-06-05T23:59:00+08:00').getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, deadline - now);

      setIsClosed(diff === 0);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!user) return <div className="p-8 text-center text-white">Loading session...</div>;

  const FINALIST_TEAMS = [
    163, "UM EE Innovators",
    115, "EyeScream",
    114, "Engincs",
    122, "Indecisive",
    145, "sudo rm-rf /",
    88, "#roadtoidp",
    126, "Learn And Hustle",
    131, "NEW SPACE",
    155, "Terminators",
    103, "Circuit Guardians",
    118, "Hail Mary",
    109, "Da adah",
    116, "FEI",
    173, "XM.UM.com",
    94, "8 HOURS OF SLEEP",
    "5", "18", "11", "16", "8", "22", "62", "54", "84", "17", "58", "57", "10", "56", "41",
    "test", 179, "179"
  ];

  if (!user.team_id) {
    return (
      <div className="bg-[#0a0c1b] min-h-screen flex items-center justify-center p-4">
        <div className="bg-[#161b33] border border-red-500/30 rounded-2xl p-8 max-w-md text-center shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-400">You must be in a team to access this page.</p>
        </div>
      </div>
    );
  }

  const isFinalist = FINALIST_TEAMS.includes(user.team_id);

  if (!isFinalist) {
    return (
      <div className="bg-[#0a0c1b] min-h-screen flex items-center justify-center p-4">
        <div className="bg-[#161b33] border border-cyan-500/30 rounded-2xl p-8 max-w-md text-center shadow-[0_0_30px_rgba(6,182,212,0.1)]">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight uppercase">Not a Finalist</h2>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            We're sorry, but this page is exclusively available to teams that have qualified for the Final Round.
            <br /><br />
            Thank you for your participation in UM Technothon 2026!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0c1b] min-h-screen p-4 md:p-8 text-center relative text-white">
      {/* Submission Period — Minimal */}
      <div className="my-6 md:my-8 mx-auto max-w-2xl">
        {/* Live indicator */}
        <div className="flex items-center justify-center gap-2 mb-3">
          {!isClosed ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 text-[10px] md:text-xs font-mono font-bold tracking-[0.3em] uppercase">Mentorship Slots Open</span>
            </>
          ) : (
            <>
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-red-500 text-[10px] md:text-xs font-mono font-bold tracking-[0.3em] uppercase">Mentorship Slots Closed</span>
            </>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl md:text-3xl font-black text-white tracking-tight mb-5 uppercase">
          Final Round
        </h2>

        {/* Date Range */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-6">
          <div className="text-center">
            <p className="text-3xl md:text-5xl font-black text-white leading-none">9</p>
            <p className="text-[10px] md:text-xs text-cyan-400 font-semibold tracking-wider uppercase mt-1">May</p>
            <p className="text-[10px] md:text-xs text-slate-400 font-mono mt-0.5">12:00 AM</p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="w-10 md:w-16 h-px bg-cyan-400/30" />
            <span className="text-[10px] text-slate-400 font-mono tracking-widest">TO</span>
            <div className="w-10 md:w-16 h-px bg-cyan-400/30" />
          </div>

          <div className="text-center">
            <p className="text-3xl md:text-5xl font-black text-white leading-none">5</p>
            <p className="text-[10px] md:text-xs text-cyan-400 font-semibold tracking-wider uppercase mt-1">June</p>
            <p className="text-[10px] md:text-xs text-slate-400 font-mono mt-0.5">11:59 PM</p>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex items-center justify-center gap-3 md:gap-4">
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hrs' },
            { value: timeLeft.minutes, label: 'Min' },
            { value: timeLeft.seconds, label: 'Sec' },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-3 md:gap-4">
              <div className="text-center">
                <p className="text-2xl md:text-4xl font-sans font-extrabold text-[#FFF8E7] leading-none tabular-nums">
                  {String(item.value).padStart(2, '0')}
                </p>
                <p className="text-[9px] md:text-[10px] text-slate-400 font-sans uppercase tracking-wider mt-1">{item.label}</p>
              </div>
              {i < 3 && <span className="text-slate-400 text-lg md:text-2xl font-light -mt-3">:</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-4 text-left max-w-7xl mx-auto">

        {/* LEFT COLUMN - MENTORSHIP BOOKING TABLE */}
        <div className="w-full md:w-2/3 bg-[#161b33] border border-cyan-500/30 rounded-2xl shadow-lg p-4 md:p-6 flex flex-col">
          <div className="mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tighter uppercase">Mentorship Booking</h3>
          </div>

          {/* REMINDERS */}
          <div className="mb-8 p-4 md:p-5 bg-[#1a223e] border border-red-500/30 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            <h4 className="text-red-500 text-sm md:text-base font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Important Reminders
            </h4>
            <ul className="text-gray-200 text-xs md:text-sm space-y-3 text-left list-disc pl-5 marker:text-red-500 leading-relaxed">
              <li>Teams are allowed to book and attend multiple mentoring session slots.</li>
              <li>Mentoring booking sessions will be conducted on a first-come, first-served basis.</li>
              <li>Rescheduling or cancellation of slots is prohibited within <span className="font-bold italic text-yellow-400">12 hours</span> before the session.</li>
              <li>Teams that enter the mentoring session more than <span className="font-bold italic text-yellow-400">5 minutes late</span> will be disqualified from the session.</li>
              <li>The mentoring session must not exceed <span className="font-bold italic text-yellow-400">25 minutes</span>. Any session that exceeds the time limit will be stopped by the moderator.</li>
              <li>For any questions, please contact the PIC of the respective mentor.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/40 text-cyan-400 text-xs md:text-sm font-mono tracking-wider uppercase border-b border-white/10">
                  <th className="p-3 md:p-4 font-semibold whitespace-nowrap">Mentor</th>
                  <th className="p-3 md:p-4 font-semibold hidden md:table-cell">Expertise</th>
                  <th className="p-3 md:p-4 font-semibold text-center whitespace-nowrap"><span className="hidden md:inline">Action</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-white/5">
                {mentors.map((mentor, index) => (
                  <tr key={index} className="hover:bg-white/10 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3 md:gap-4">
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.1)] group-hover:border-cyan-400 transition-colors"
                        />
                        <div>
                          <p className="text-white font-semibold text-sm md:text-base group-hover:text-cyan-300 transition-colors">{mentor.name}</p>
                          <p className="text-gray-400 text-xs md:text-sm mt-0.5">{mentor.org}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell align-middle">
                      <p className="text-gray-300 text-sm max-w-xs">{mentor.role}</p>
                    </td>
                    <td className="p-4 text-center align-middle">
                      <button
                        className="bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-[#0a0c1b] border border-cyan-500/50 transition-all duration-300 px-3 md:px-6 py-1.5 md:py-2 rounded-lg text-xs font-bold tracking-wide uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] whitespace-nowrap"
                        onClick={() => alert(`Booking functionality for ${mentor.name} coming soon!`)}
                      >
                        Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN - SUBMISSION */}
        <div className="w-full md:w-1/3">
          <div className="w-full transition-all duration-300 ease-in-out bg-[#161b33] border border-cyan-500/30 rounded-2xl shadow-lg p-6 text-center sticky top-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/30">
              <svg xmlns="http://www.w3.org/-2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Submission</h3>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
              Task submissions are handled via Google Forms. Make sure you have all your deliverables ready before clicking the button below.
            </p>
            <button
              disabled
              onClick={() => window.open('https://forms.gle/YLDYMktXTdN86bZf7', '_blank')}
              className="w-full text-base font-bold px-4 py-4 rounded-xl bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed transition-all uppercase tracking-wider"
            >
              Ready to Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAndSubmission;