export default function Hero() {
  return (
  <section className="bg-lightBg min-h-screen flex items-center">
    <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-12">

      {/* LEFT SIDE - TEXT */}
      <div className="md:w-1/2 text-center md:text-left md:pr-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          TURN <br />
          VIRTUAL INTO <br />
          REALITY
        </h1>
        <p className="text-lg md:text-xl max-w-xl mb-8 text-trailDark">
          Bridging Logic & Imagination through Applied Innovation.
        </p>

        <button className="bg-[#1e2372] text-white px-8 py-3 rounded-lg hover:opacity-90 transition">
          Join Us Now
        </button>
      </div>

      {/* RIGHT SIDE - IMAGE */}
      <div className="md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
        <img
          src="/logos/technothon-logo-transparent.png"
          alt="Technothon 2026 Logo"
          className="max-w-md md:max-w-md w-full"
        />
      </div>

    </div>
  </section>
) }
