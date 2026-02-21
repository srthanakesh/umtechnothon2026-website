"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Rearranged the order as requested
const socialLinks = [
  {
    name: "UM Technothon", // First
    imgSrc: "logos/Logo border rounded.png",
    instagram: "https://www.instagram.com/um.technothon?igsh=eXRhcmZsZng2Nnhl",
  },
  {
    name: "Google Developer Group On Campus Universiti Malaya", // Second
    imgSrc: "logos/Copy of GDG On Campus - Stacked - Dark.png",
    instagram: "https://www.instagram.com/gdg.um?igsh=bjNuY3B1ZDFwdXQz",
  },
  {
    name: "Engineering Society of University Malaya", // Third (original order)
    imgSrc: "logos/ESUM_Logo_transparentBG.png",
    instagram: "https://www.instagram.com/esum_official?igsh=YXFmYjhsNTJjcDR6",
  },
  {
    name: "IEM-UM Student Section", // Fourth (original order)
    imgSrc: "logos/IEM UM SS colour version(transparent).png",
    instagram: "https://www.instagram.com/esum_official?igsh=YXFmYjhsNTJjcDR6",
  },
]

const SocialMedia = () => {
  const scrollContainerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToSlide = (index) => {
    if (scrollContainerRef.current && !isTransitioning && index !== activeIndex) {
      setIsTransitioning(true)
      setActiveIndex(index)

      const { clientWidth } = scrollContainerRef.current
      scrollContainerRef.current.scrollTo({
        left: index * clientWidth,
        behavior: "smooth",
      })

      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }
  }

  const nextSlide = () => {
    if (activeIndex < socialLinks.length - 1) {
      goToSlide(activeIndex + 1)
    } else {
      goToSlide(0) // Loop back to first slide
    }
  }

  const prevSlide = () => {
    if (activeIndex > 0) {
      goToSlide(activeIndex - 1)
    } else {
      goToSlide(socialLinks.length - 1) // Loop to last slide
    }
  }

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex, isTransitioning])

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#9599d2] to-[#d0d2f0] py-10">
      <div className="w-4/5 h-1 bg-black mx-auto mb-20"></div>
      <h1 className="text-2xl text-center font-bold text-black mb-8 px-4">
        Want to know more about us? <br />
        Follow our Instagram!
      </h1>

      {/* Mobile Slider - New Design */}
      <div className="relative w-full max-w-md mx-auto md:hidden">
        <div className="overflow-hidden rounded-xl shadow-lg">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-hidden snap-x snap-mandatory"
            style={{ scrollBehavior: "smooth" }}
          >
            {socialLinks.map((account, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full flex flex-col items-center justify-center snap-center p-8 backdrop-blur-sm"
                style={{ height: "320px" }}
              >
                <div className="w-40 h-40 mb-6 flex items-center justify-center">
                  <a
                    href={account.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full overflow-hidden hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                  >
                    <img
                      src={account.imgSrc || "/placeholder.svg"}
                      alt={account.name}
                      className="w-full h-full object-contain"
                    />
                  </a>
                </div>
                <p className="text-center text-lg font-semibold max-w-[250px] text-black">{account.name}</p>
                <a
                  href={account.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-6 py-2 bg-[#9599d2] text-white rounded-full hover:bg-[#7a7fb8] transition-colors duration-300 flex items-center justify-center"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 z-10">
          <button
            onClick={prevSlide}
            className="bg-white/50 rounded-full p-2 shadow-md hover:bg-white/70 transition-colors duration-300"
            aria-label="Previous slide"
            disabled={isTransitioning}
          >
            <ChevronLeft className="w-5 h-5 text-[#7a7fb8]" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/50 rounded-full p-2 shadow-md hover:bg-white/70 transition-colors duration-300"
            aria-label="Next slide"
            disabled={isTransitioning}
          >
            <ChevronRight className="w-5 h-5 text-[#7a7fb8]" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-4 gap-2">
          {socialLinks.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-6 bg-[#7a7fb8]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-20">
        {socialLinks.map((account, index) => (
          <div key={index} className="flex flex-col items-center group">
            <div className="w-40 h-40 mb-4 flex items-center justify-center overflow-hidden rounded-xl p-4 shadow-md transition-all duration-300 group-hover:shadow-lg">
              <a
                href={account.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full overflow-hidden hover:scale-110 transition-transform duration-300 flex items-center justify-center"
              >
                <img
                  src={account.imgSrc || "/placeholder.svg"}
                  alt={account.name}
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
            <p className="text-center mt-2 text-lg font-semibold max-w-[250px] text-black">{account.name}</p>
            {/* Visit Instagram link removed as requested */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SocialMedia
