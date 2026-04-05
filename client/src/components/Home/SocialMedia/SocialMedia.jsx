"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Rearranged the order as requested
const socialLinks = [
  {
    name: "UM Technothon", // First
    imgSrc: "logos/technothon-2026-logov3.png",
    instagram: "https://www.instagram.com/umtechnothon?igsh=eXRhcmZsZng2Nnhl",
  },
  {
    name: "Google Developer Group On Campus Universiti Malaya", // Second
    imgSrc: "logos/Copy of GDG On Campus - Stacked - Dark.png",
    instagram: "https://www.instagram.com/gdg.um?igsh=bjNuY3B1ZDFwdXQz",
  },
  {
    name: "Robotics Engineering Community", 
    imgSrc: "logos/recLogo.png",
    instagram: "https://www.instagram.com/rec_um/?hl=en",
  },
]

const SocialMedia = () => {
  const scrollContainerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isUserInteracting, setIsUserInteracting] = useState(false)

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
    if (isUserInteracting) return // Skip auto-advance if user is interacting

    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex, isUserInteracting])
  
  //Scrolling sync
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let timeout = null

    const handleScroll = () => {
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        const { scrollLeft, clientWidth } = container
        const newIndex = Math.round(scrollLeft / clientWidth)
        setActiveIndex(newIndex)
      }, 100) // Debounce scroll event
    }

    container.addEventListener("scroll", handleScroll)
    return () => {
      container.removeEventListener("scroll", handleScroll)
      clearTimeout(timeout)}
  }, [])

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0f172a] py-20">
      {/* Divider */}
      <div className="w-4/5 h-[1px] bg-white/20 mx-auto mb-16"></div>
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl text-center font-bold text-white mb-12 px-4 tracking-wide">
        Want to know more about us? <br />
        Follow our Instagram!
      </h1>

      {/* Mobile Slider - New Design */}
      <div className="relative w-full max-w-md mx-auto md:hidden">
        <div className="overflow-hidden rounded-xl shadow-lg">
          <div
            ref={scrollContainerRef}
            onTouchStart={() => setIsUserInteracting(true)}
            onTouchEnd={() => setTimeout(() => setIsUserInteracting(false), 1000)}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ 
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch", 
            }}
          >
            {socialLinks.map((account, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full flex flex-col items-center justify-center snap-center p-8 backdrop-blur-sm"
                style={{ height: "400px" }}
              >
                <div className="w-48 h-48 mb-6 flex items-center justify-center">
                  <a
                    href={account.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full flex items-center justify-center"
                  >

                    <img
                      src={account.imgSrc || "/placeholder.svg"}
                      alt={account.name}
                      className="w-full h-full object-contain"
                    />
                  </a>
                </div>
                <p className="text-center text-lg font-semibold max-w-[250px] text-gray-200">{account.name}</p>
                <a
                  href={account.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-6 py-2 bg-[#4c5ab6] text-white rounded-full hover:bg-[#2e3b7f] transition-colors duration-300 flex items-center justify-center"
                >
                  Follow Us
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 z-10">
          <button
            onClick={prevSlide}
            className="bg-[#5da4cf] border-border-white/10 rounded-full p-2 shadow-md hover:bg-white/70 transition-colors duration-300"
            aria-label="Previous slide"
            disabled={isTransitioning}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/20 rounded-full p-2 shadow-md hover:bg-white/40 transition-colors duration-300"
            aria-label="Next slide"
            disabled={isTransitioning}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-4 gap-2">
          {socialLinks.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-6 bg-[#4c5ab6]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
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
          <div key={account.instagram} className="flex flex-col items-center group">
            <div className="w-48 h-48 mb-4 flex items-center justify-center overflow-hidden bg-[#1e293b] border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
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
            <p className="text-center mt-2 text-lg font-semibold max-w-[250px] text-gray-200">{account.name}</p>
            {/* Visit Instagram link removed as requested */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SocialMedia