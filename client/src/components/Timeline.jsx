export default function Timeline() {
  const events = [
    {
      date: "9 March - 24 April 11:59 PM",
      title: "Registration",
    },
    {
      date: "25 April 12PM",
      title: "Domain Reveal & Preliminary Round Briefting",
    },
    {
      date: "25 April - 3 May 11:59 PM",
      title: "Preliminary Round - Idea & Video Building",
    },
    {
      date: "1 - 3 May 11:59 PM",
      title: "Preliminary Round - Submission",
    },
    {
      date: "4 - 8 May",
      title: "Preliminary Round - Judging",
    },
    {
      date: "9 May 12PM",
      title: "Finalist Announcement(20 Teams) + Final Round Briefing",
    },
    {
      date: "9 May - 6 June",
      title: "Final Round - Prototype Building",
    },
    {
      date: "1 - 6 June 11:59 PM",
      title: "Final Round - Submission",
    },
    {
      date: "6 June",
      title: "Physical Final Day - Mentoring Session",
    },
    {
      date: "7 June",
      title: "Physical Final Day - Pitching Day",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primaryBlue mb-6">
            Event Timeline
          </h2>
          <p className="text-lg text-trailDark">
            Key dates to remember for UM Technothon 2026.
          </p>
        </div>

        <div className="relative border-l-2 border-primaryBlue ml-6 p1-4">

          {events.map((event, index) => (
            <div key={index} className="mb-12 relative">
              <div className="absolute -left-[26px] top-1 w-5 h-5 bg-primaryBlue rounded-full border-4 border-white"> </div>
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <span className="text-sm text-gray-500">{event.date}</span>
              <p className="mt-2 text-trailDark">{event.description}</p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}