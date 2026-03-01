export default function About() {
  return (
    <section className="bg-slate-800 py-24">
      <div className="container mx-auto px-6">
        <div className="bg-slate-800 rounded-2xl shadow-xl shadow-black/40 border border-slate-700 p-12 md:p-20">

        {/* SECTION TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
            Bridging Logic & Imagination
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-300">
            The 2026 theme centers on Applied Innovation —
            where technology provides the logic, and students bring imagination.
          </p>
        </div>

        {/* CONTENT GRID */}
        <div className="grid md:grid-cols-2 gap-16">

          {/* LEFT */}
          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm rounded-lg p-6 rounded-xl shadow-lg border-slate-600 hover:-translate-y-1 transition duration-300">
            <h3 className="text-2xl font-bold mb-4 text-white">
              The "T" Circuitry Construction
            </h3>
            <p className="text-slate-300 leading-relaxed">
              The centerpiece is a capital "T" formed by asymmetric circuit paths.
              The interconnected nodes represent collaboration, complexity,
              and the journey toward impactful solutions.
            </p>
          </div>

          {/* RIGHT */}
          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm rounded-lg p-6 rounded-xl shadow-lg border-slate-600 hover:-translate-y-1 transition duration-300">
            <h3 className="text-2xl font-bold mb-4 text-white">
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