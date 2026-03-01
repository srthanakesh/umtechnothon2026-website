export default function About() {
  return (
    <section className="bg-lightBg py-24">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-sm p-10 md:p-16">

        {/* SECTION TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primaryBlue">
            Bridging Logic & Imagination
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-trailDark">
            The 2026 theme centers on Applied Innovation —
            where technology provides the logic, and students bring imagination.
          </p>
        </div>

        {/* CONTENT GRID */}
        <div className="grid md:grid-cols-2 gap-16">

          {/* LEFT */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              The "T" Circuitry Construction
            </h3>
            <p className="text-trailDark leading-relaxed">
              The centerpiece is a capital "T" formed by asymmetric circuit paths.
              The interconnected nodes represent collaboration, complexity,
              and the journey toward impactful solutions.
            </p>
          </div>

          {/* RIGHT */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              The Momentum Arrow
            </h3>
            <p className="text-trailDark leading-relaxed">
              A bold blue arrow pierces through the structure —
              symbolizing drive, breakthrough, and the courage
              to move ideas into reality.
            </p>
          </div>

        </div>
       </div>
      </div>
    </section>
  )
}