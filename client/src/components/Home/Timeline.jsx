export default function Timeline() {
  const events = [
    { date: "9 March - 24 April 11:59PM", event: "Registration" },
    { date: "25 April 12PM", event: "Domain Reveal & Preliminary Round Briefing" },
    { date: "25 April - 3 May 11:59PM", event: "Preliminary Round - Idea and Video Building" },
    { date: "1 - 3 May 11:59PM", event: "Preliminary Round - Submission" },
    { date: "4 - 8 May", event: "Preliminary Round - Judging" },
    { date: "9 May 12PM", event: "Finalist Announcement (20 Teams) + Final Round Briefing" },
    { date: "9 May - 6 June", event: "Final Round - Prototype Building" },
    { date: "1 - 6 June 11:59PM", event: "Final Round - Submission" },
    { date: "6 June", event: "Physical Final Day - Mentoring Session" },
    { date: "7 June", event: "Physical Final Day - Pitching Day" }
  ];

  return (
    <section className="bg-gradient-to-b from-white to-slate-100 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-grey-900 center mb-12 text-center">
          Event Timeline
        </h2>

        <div className="relative border-l-4 border-primaryBlue ml-8">
          {events.map((item, index) => (
            <div key={index} className="mb-12 ml-10 relative">
              <div className="absolute -left-6 top-2 w-5 h-5 bg-primaryBlue-900 rounded-full border-2 border-white shadow-lg shadow-blue-300/50"></div>

              <p className="text-sm text-primaryBlue text-base font-semibold mb-1 tracking-wide">
                {item.date}
              </p>

              <h3 className="text-xl font-bold text-gray-900">
                {item.event}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}