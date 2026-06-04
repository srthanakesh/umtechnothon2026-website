"use client"

import { useState } from "react"

const sponsorTiers = [
  {
    title: "Diamond Sponsor",
    direction: "ltr",
    sponsors: [
      { name: "Webby Group", logo: "/logos/Diamond/Webby Group Full Logo - Black@3x-1.png", url: "" },
    ],
    speed: 60,
    titleColor: "#b9f2ff",
    fontWeight: "font-black",
    bgColor: "bg-[#2dcefb]/15",
    borderColor: "border-[#2dcefb]/60"
  },
  {
    title: "Platinum Sponsors",
    direction: "rtl",
    sponsors: [
      { name: "Chin Hin Group", logo: "/logos/Platinum/Chin Hin Blue Font.png", url: "" },
      { name: "Mi Equipment", logo: "/logos/Platinum/MiEquipment_Logo_RGB-Rounded-v2.1.svg", url: "" },
    ],
    speed: 60,
    titleColor: "#e5e7eb",
    fontWeight: "font-bold",
    bgColor: "bg-white/10",
    borderColor: "border-white/30"
  },
  {
    title: "Gold Sponsor",
    direction: "ltr",
    sponsors: [
      { name: "SEEK", logo: "/logos/Gold/seek logo-black.png", url: "" },
    ],
    speed: 60,
    titleColor: "#fbbf24",
    fontWeight: "font-semibold",
    bgColor: "bg-[#fbbf24]/10",
    borderColor: "border-[#fbbf24]/40"
  },
  {
    title: "Benefit-in-Kind",
    direction: "rtl",
    sponsors: [
      { name: "Coca-Cola", logo: "/logos/Benefit inkind/Coca-Cola SIMA_Logo (Latest)-01.png", url: "" },
      { name: "Favoriot", logo: "/logos/Benefit inkind/Favoriot - New Logo.png", url: "" },
      { name: "Good Morning", logo: "/logos/Benefit inkind/Good Morning.png", url: "" },
      { name: "Zus Coffee", logo: "/logos/Benefit inkind/Zus.png", url: "" },
      { name: "Dell Technologies", logo: "/logos/Benefit inkind/delltech-logo-stk-blue-rgb-1280x1280.jpeg", url: "" },
    ],
    speed: 120,
    titleColor: "#9ca3af",
    fontWeight: "font-normal",
    bgColor: "bg-white/5",
    borderColor: "border-white/10"
  },
]

const SponsorRow = ({ sponsors, direction, speed = 50 }) => {
  const [isPaused, setIsPaused] = useState(false)
  const multipleSponsors = Array(8).fill(sponsors).flat()

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative py-8">
        <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[#0b0e14] via-[#0b0e14]/90 to-transparent z-30 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[#0b0e14] via-[#0b0e14]/90 to-transparent z-30 pointer-events-none" />

        <div
          className="inline-flex gap-4 md:gap-8 transform-gpu"
          style={{
            animation: `${direction === "ltr" ? "scrollLeft" : "scrollRight"} ${speed}s linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
            width: "fit-content",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {multipleSponsors.map((sponsor, index) => (
            <div
              key={index}
              className="flex items-center justify-center bg-white p-3 rounded-xl min-w-[140px] md:min-w-[220px] h-[70px] md:h-[110px] transition-all duration-500 hover:scale-110 shadow-sm"
            >
              <img 
                src={sponsor.logo || "/placeholder.svg"} 
                alt={sponsor.name} 
                className="max-w-[85%] max-h-[85%] object-contain" 
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const SponsorSlider = () => {
  return (
    <div className="relative bg-[#0b0e14] py-24 font-sans overflow-hidden">
      
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#2dcefb] to-transparent mx-auto mb-8 md:mb-12 opacity-50"></div>

      <div className="relative z-10 max-w-full mx-auto text-center">
        
        <div className="mb-16 px-4">
          <h2 className="text-4xl md:text-5xl font-black text-[#fafdff] tracking-widest uppercase">Sponsors</h2>
          <p className="text-[#2dcefb] mt-2 font-mono text-xs tracking-[0.3em] uppercase opacity-80">Empowering the Future</p>
        </div>

        <div className="relative">
          <div className="space-y-12">
            {sponsorTiers.map((tier, index) => (
              <div key={index} className="relative">
                <div className={`inline-block mb-4 px-8 py-2 rounded-full border ${tier.borderColor} ${tier.bgColor} backdrop-blur-md`}>
                  <h3 className={`text-sm md:text-base ${tier.fontWeight} uppercase tracking-widest`} style={{ color: tier.titleColor }}>
                    {tier.title}
                  </h3>
                </div>
                <SponsorRow {...tier} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

export default SponsorSlider;