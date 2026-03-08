"use client"

import { useEffect, useState } from "react"
import { ExternalLink } from "lucide-react"

const sponsorTiers = [
  {
    title: "Platinum Sponsors",
    direction: "ltr",
    sponsors: [
      { name: "Sponsor name", logo: "/logos/placeholder.jpeg", url: "" },
      { name: "Sponsor name", logo: "/logos/placeholder.jpeg", url: "" },
    ],
    speed: 60,
    titleColor: "#2dcefb", 
    fontWeight: "font-bold",
    bgColor: "bg-[#2dcefb]/10", 
    borderColor: "border-[#2dcefb]/50"
  },
  {
    title: "Gold Sponsors",
    direction: "rtl",
    sponsors: [
      { name: "Sponsor name", logo: "/logos/placeholder.jpeg", url: "" },
      { name: "Sponsor name", logo: "/logos/placeholder.jpeg", url: "" },
      { name: "Sponsor name", logo: "/logos/placeholder.jpeg", url: "" },
    ],
    speed: 50,
    titleColor: "#fafdff",
    fontWeight: "font-semibold",
    bgColor: "bg-white/5",
    borderColor: "border-white/20"
  },
  {
    title: "Silver Sponsors",
    direction: "ltr",
    sponsors: [
      { name: "Sponsor name", logo: "/logos/placeholder.jpeg", url: "" },
      { name: "Sponsor name", logo: "/logos/placeholder.jpeg", url: "" },
      { name: "Sponsor name", logo: "/logos/placeholder.jpeg", url: "" },
      { name: "Sponsor name", logo: "/logos/placeholder.jpeg", url: "" },
    ],
    speed: 55,
    titleColor: "#fafdff",
    fontWeight: "font-semibold",
    bgColor: "bg-white/5",
    borderColor: "border-white/10"
  },
  {
    title: "Benefit-in-Kind",
    direction: "rtl",
    sponsors: [
      { name: "Sponsor name", logo: "/logos/placeholder.jpeg", url: "" },
      { name: "Sponsor name", logo: "/logos/placeholder.jpeg", url: "" },
    ],
    speed: 65,
    titleColor: "#9ca3af",
    fontWeight: "font-normal",
    bgColor: "bg-white/5",
    borderColor: "border-white/5"
  },
]

const SponsorRow = ({ sponsors, direction, speed = 50 }) => {
  const [isPaused, setIsPaused] = useState(false)
  const multipleSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors]

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fixed the Gap: 
         1. No horizontal padding on this container so gradients hit the absolute edge.
         2. py-10 ensures the scale-up doesn't clip the top/bottom.
      */}
      <div className="relative py-10">
        
        {/* Edge Fades: Now truly flush with the edges */}
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
            <a
              key={index}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-white p-3 rounded-xl min-w-[140px] md:min-w-[220px] h-[70px] md:h-[110px] transition-all duration-500 hover:scale-110 group relative z-10 shadow-sm"
            >
              <img 
                src={sponsor.logo || "/placeholder.svg"} 
                alt={sponsor.name} 
                className="max-w-[85%] max-h-[85%] object-contain" 
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[#0b0e14]/90 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="w-6 h-6 text-[#2dcefb]" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

const SponsorSlider = () => {
  return (
    <div className="relative bg-[#0b0e14] py-24 font-sans">
      
      {/* Divider: Changed from black to a Vivid Azure gradient glow */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#2dcefb] to-transparent mx-auto mb-8 md:mb-12 opacity-50"></div>

      <div className="relative z-10 max-w-full mx-auto text-center">
        
        {/* Header Section */}
        <div className="mb-16 px-4">
          <h2 className="text-4xl md:text-5xl font-black text-[#fafdff] tracking-widest uppercase">Sponsors</h2>
          <p className="text-[#2dcefb] mt-2 font-mono text-xs tracking-[0.3em] uppercase opacity-80">Empowering the Future</p>
        </div>

        {/* Tiers Container */}
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

        {/* Support CTA */}
        <div className="mt-28 max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-center p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl group min-h-[160px]">
            <p className="text-[#fafdff] text-lg md:text-xl font-medium relative z-10 max-w-xl text-center">
              We are currently seeking sponsorship opportunities. <br className="hidden md:block" /> 
              If you are interested, please contact us for more details: <br className="hidden md:block" />
              <a href="mailto:umtechnothon.sponsorship@gmail.com" className="text-[#2dcefb] hover:text-white transition-colors">
                umtechnothon.sponsorship@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes scrollRight {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

export default SponsorSlider