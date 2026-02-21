"use client"

import { useEffect, useState } from "react"
import { ExternalLink } from "lucide-react"

// Sample sponsor data based on the image - now with URLs and refined gradients
const sponsorTiers = [
  {
    title: "Platinum Sponsors",
    direction: "ltr", // left to right
    sponsors: [
      { name: "Verdant Solar", logo: "/logos/Platinum/verdant_logo.7fca20fe.png", url: "https://verdantsolar.my/" },
      { name: "Verdant Solar", logo: "/logos/Platinum/verdant_logo.7fca20fe.png", url: "https://verdantsolar.my/" },
      // Add more sponsors as needed
    ],
    elevation: "xl", // highest elevation
    speed: 65, // slower speed
    titleColor: "#4a4f85", // Darker for better contrast
    fontWeight: "font-bold",
    bgColor: "bg-white/30", // Semi-transparent white background
  },
  {
    title: "Gold Sponsors",
    direction: "rtl", // right to left
    sponsors: [
      { name: "Li-Zainal", logo: "/logos/Gold/lizainal_logo.jpg", url: "https://www.li-zainal.com/" },
      { name: "BASF", logo: "/logos/Gold/BASF_Logo.jpg", url: "https://www.basf.com/my/en" },
      {
        name: "MoneyLion",
        logo: "/logos/Gold/MoneyLion_Logo_RGB_Vertical_Solid_Black.png",
        url: "https://www.moneylion.com/",
      },
      // Add more sponsors as needed
    ],
    elevation: "lg", // high elevation
    speed: 45, // medium speed
    titleColor: "#5a5f95", // Slightly lighter
    fontWeight: "font-semibold",
    bgColor: "bg-white/25", // Semi-transparent white background

  },
  {
    title: "Silver Sponsors",
    direction: "ltr", // left to right
    sponsors: [
      {
        name: "Youth OS",
        logo: "/logos/Silver/YouthOS logo.jpeg",
        url: "https://youths.asia/",
      },
      {
        name: "Xenber",
        logo: "/logos/Silver/Xenber Logo 220x70.png",
        url: "https://xenber.com/",
      },
      {
        name: "Youth OS",
        logo: "/logos/Silver/YouthOS logo.jpeg",
        url: "https://youths.asia/",
      },
      {
        name: "Xenber",
        logo: "/logos/Silver/Xenber Logo 220x70.png",
        url: "https://xenber.com/",
      },
      // Add more sponsors as needed
    ],
    elevation: "lg", // high elevation
    speed: 65, // medium speed
    titleColor: "#5a5f95", // Slightly lighter
    fontWeight: "font-semibold",
    bgColor: "bg-white/25", // Semi-transparent white background
  },
  {
    title: "Benefit-in-Kind",
    direction: "rtl", // right to left
    sponsors: [
      { name: "Cytron", logo: "/logos/Benefit inkind/logo cytron blue (BIG).png", url: "https://my.cytron.io/" },
      { name: "F.Works", logo: "/logos/Benefit inkind/F.Works_logo.png", url: "" },
      { name: "Cytron", logo: "/logos/Benefit inkind/logo cytron blue (BIG).png", url: "https://my.cytron.io/" },
      { name: "F.Works", logo: "/logos/Benefit inkind/F.Works_logo.png", url: "" },
      // Add more sponsors as needed
    ],
    elevation: "sm", // lowest elevation
    speed: 65, // fastest speed
    titleColor: "#7a7fb5", // Lighter color
    fontWeight: "font-normal",
    bgColor: "bg-white/15", // Semi-transparent white background
  },
]

/**
 * Hook to detect if the device is mobile
 * @returns {boolean} True if the device is mobile
 */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIsMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return isMobile
}

/**
 * SponsorRow component displaying a row of sponsors with automatic scrolling
 */
const SponsorRow = ({ sponsors, direction, elevation = "md", speed = 50 }) => {
  const isMobile = useIsMobile()
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // Create a long sequence of sponsors to prevent visible resets
  // Use fewer duplicates on mobile for better performance
  const multipleSponsors = isMobile
    ? [...sponsors, ...sponsors, ...sponsors, ...sponsors]
    : [...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors]

  // Get shadow class based on elevation
  const getShadowClass = () => {
    // Reduce shadow intensity on mobile
    if (isMobile) {
      return "shadow-sm"
    }

    switch (elevation) {
      case "sm":
        return "shadow-sm"
      case "md":
        return "shadow-md"
      case "lg":
        return "shadow-lg"
      case "xl":
        return "shadow-xl"
      default:
        return "shadow-md"
    }
  }

  // Get scale based on elevation for 3D effect
  const getScale = () => {
    // Reduce or eliminate scaling on mobile
    if (isMobile) {
      return "scale-100"
    }

    switch (elevation) {
      case "sm":
        return "scale-95"
      case "md":
        return "scale-100"
      case "lg":
        return "scale-105"
      case "xl":
        return "scale-110"
      default:
        return "scale-100"
    }
  }

  // Get z-index based on elevation
  const getZIndex = () => {
    switch (elevation) {
      case "sm":
        return "z-10"
      case "md":
        return "z-20"
      case "lg":
        return "z-30"
      case "xl":
        return "z-40"
      default:
        return "z-10"
    }
  }

  // Adjust animation speed for mobile
  const adjustedSpeed = isMobile ? speed * 0.8 : speed

  // Define keyframes for scroll animations
  const keyframes = {
    infiniteScrollLeft: {
      from: { transform: "translateX(0)" },
      to: { transform: `translateX(calc(-${sponsors.length * 100}% / ${isMobile ? 4 : 6}))` },
    },
    infiniteScrollRight: {
      from: { transform: `translateX(calc(-${sponsors.length * 100}% / ${isMobile ? 4 : 6}))` },
      to: { transform: "translateX(0)" },
    },
  }

  // Create animation style
  const animationStyle = {
    animation: `${direction === "ltr" ? "infiniteScrollLeft" : "infiniteScrollRight"} ${adjustedSpeed}s linear infinite`,
    animationPlayState: isPaused ? "paused" : "running",
    width: "fit-content",
    willChange: "transform", // Optimize for animations
  }

  return (
    <div className={`relative ${getZIndex()} ${isMobile ? "" : "perspective"}`}>
      {/* Container with extra padding to prevent cutoff */}
      <div className="overflow-hidden py-8 px-4">
        {/* Add a subtle gradient overlay to enhance depth perception */}
        <div className="absolute inset-0 pointer-events-none z-50">
          <div className="absolute left-0 w-16 md:w-24 h-full bg-gradient-to-r from-[#e8f4ff] via-[#e8f4ff80] to-transparent opacity-70"></div>
          <div className="absolute right-0 w-16 md:w-24 h-full bg-gradient-to-l from-[#e8f4ff] via-[#e8f4ff80] to-transparent opacity-70"></div>
        </div>

        <div
          className={`inline-flex gap-3 md:gap-6 ${getScale()} transform-gpu`}
          style={animationStyle}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false)
            setHoveredIndex(null)
          }}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            setIsPaused(false)
            setHoveredIndex(null)
          }}
        >
          {multipleSponsors.map((sponsor, index) => (
            <a
              key={index}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                inline-block bg-white rounded-lg ${getShadowClass()} 
                p-2 md:p-4 min-w-[120px] md:min-w-[200px] h-[60px] md:h-[100px] 
                flex items-center justify-center 
                transition-all duration-300 transform-gpu 
                group relative
                ${hoveredIndex === index ? "scale-110 shadow-xl z-50 translate-y-[-8px]" : ""}
                focus:scale-110 focus:shadow-xl focus:translate-y-[-8px] focus:z-50
                focus:outline-none focus:ring-2 focus:ring-[#6a6fa5] focus:ring-offset-2
                cursor-pointer
                my-4 md:my-6
              `}
              style={{
                transform: isMobile
                  ? hoveredIndex === index
                    ? "scale(1.1) translateY(-8px)"
                    : "none"
                  : `translateZ(${elevation === "xl" ? 20 : elevation === "lg" ? 10 : elevation === "md" ? 5 : 0}px) ${
                      hoveredIndex === index ? "scale(1.1) translateY(-8px)" : ""
                    }`,
              }}
              aria-label={`Visit ${sponsor.name} website`}
              onClick={(e) => {
                // Prevent click from bubbling up to parent elements
                e.stopPropagation()
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(index)}
            >
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={sponsor.logo || "/placeholder.svg"}
                  alt={sponsor.name}
                  className="max-w-[90%] max-h-[90%] object-contain transition-opacity group-hover:opacity-90"
                  loading="lazy" // Add lazy loading for better performance
                  style={{
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              </div>

              {/* External link icon that appears on hover/focus */}
              <div
                className={`absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-lg transition-opacity duration-300 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <ExternalLink className="w-6 h-6 text-[#6a6fa5]" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Add keyframes using style tag */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes infiniteScrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-${sponsors.length * 100}% / ${isMobile ? 4 : 6})); }
        }
        
        @keyframes infiniteScrollRight {
          from { transform: translateX(calc(-${sponsors.length * 100}% / ${isMobile ? 4 : 6})); }
          to { transform: translateX(0); }
        }
        
        .perspective {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
      `,
        }}
      />
    </div>
  )
}

const SponsorSlider = () => {
  const isMobile = useIsMobile()

  return (
    <div className="relative overflow-hidden">
      {/* Professional gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8f4ff] via-[#d1e6ff] to-[#c4cef0] z-0"></div>

      {/* Decorative elements for a more professional look */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-[#ffffff] to-[#a0c4ff] blur-3xl"></div>
        <div className="absolute top-[60%] -right-[5%] w-[30%] h-[40%] rounded-full bg-gradient-to-tl from-[#ffffff] to-[#a0c4ff] blur-3xl"></div>
        <div className="absolute top-[40%] left-[20%] w-[15%] h-[20%] rounded-full bg-gradient-to-tr from-[#ffffff] to-[#a0c4ff] blur-3xl"></div>
      </div>

      {/* Content with relative positioning to appear above the background */}
      <div className="relative z-10 p-4 md:p-8 text-center overflow-hidden">
        {/* Added top padding to ensure titles aren't cut off, but reduced from previous version */}
        <div className="pt-8 md:pt-10">
          <div className="w-5/6 h-1 bg-gradient-to-r from-transparent via-[#4a4f85] to-transparent mx-auto mb-6 md:mb-10"></div>
          <h2 className="text-xl md:text-2xl font-bold text-[#2d3259] mb-6 md:mb-8 relative z-50">SPONSORS</h2>

          {/* Reduced spacing between tiers */}
          <div className="space-y-8 md:space-y-12 relative">
            {sponsorTiers.map((tier, index) => (
              <div key={index} className="mb-8 md:mb-10 relative">
                {/* Reduced vertical margins */}
                <div
                  className={`inline-block px-8 py-3 rounded-full ${tier.bgColor} backdrop-blur-sm shadow-md mb-4 md:mb-6 transition-transform duration-300 hover:scale-105 mx-auto`}
                >
                  <h3
                    className={`text-lg md:text-xl ${tier.fontWeight} relative z-50`}
                    style={{ color: tier.titleColor }}
                  >
                    {tier.title}
                  </h3>
                </div>
                <SponsorRow
                  sponsors={tier.sponsors}
                  direction={tier.direction}
                  elevation={tier.elevation}
                  speed={tier.speed}
                />
              </div>
            ))}
          </div>

          <div className="mt-4 md:mt-6 max-w-xs md:max-w-2xl mx-auto bg-white/80 backdrop-blur-sm p-3 md:p-5 rounded-xl md:rounded-2xl border border-[#6a6fa5]/30 shadow-lg">
            <p className="text-sm md:text-base leading-relaxed text-gray-800">
              We are currently seeking sponsorship opportunities. If you are interested, please contact us for more
              details.
            </p>
          </div>
        </div>
      </div>

      {/* Add perspective container style using dangerouslySetInnerHTML */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .perspective-container {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
      `,
        }}
      />
    </div>
  )
}

export default SponsorSlider
