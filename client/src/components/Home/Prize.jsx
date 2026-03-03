"use client"

import { useEffect, useState, useRef } from "react"
import { Trophy, Star } from "lucide-react"

const Prize = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const confettiRef = useRef(null)
  const prizeSectionRef = useRef(null)
  const confettiCount = 150 // Number of confetti pieces
  const hasTriggeredConfetti = useRef(false)

  // State for trophy rotation
  const [trophyRotation, setTrophyRotation] = useState({ x: 15, y: -15 })
  const trophyRefs = useRef([])

  // 7. Add a custom hook for detecting mobile devices
  const useMobile = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 640)
      }

      checkMobile()
      window.addEventListener("resize", checkMobile)
      return () => window.removeEventListener("resize", checkMobile)
    }, [])

    return isMobile
  }

  // 8. Use the mobile hook
  const isMobile = useMobile()

  // 6. Add a useEffect hook to handle window resize for responsive star sizes
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // 9. Update the handleMouseMove function to be more mobile-friendly
  const handleMouseMove = (e, index) => {
    if (!trophyRefs.current[index] || isMobile) return

    const trophy = trophyRefs.current[index]
    const rect = trophy.getBoundingClientRect()

    // Calculate mouse position relative to the trophy
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate rotation based on mouse position
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate rotation (limited range for subtle effect)
    const rotateY = ((x - centerX) / centerX) * 15 // -15 to 15 degrees
    const rotateX = ((y - centerY) / centerY) * -15 // 15 to -15 degrees

    // Apply the rotation to the specific trophy
    trophy.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg)
    `
  }

  // Reset trophy rotation when mouse leaves
  const handleMouseLeave = (index) => {
    if (!trophyRefs.current[index]) return

    // Smoothly animate back to default position
    trophyRefs.current[index].style.transform = `
      perspective(1000px) 
      rotateX(15deg) 
      rotateY(-15deg)
    `
  }

  useEffect(() => {
    // Function to handle touch events for mobile devices
    const handleTouchStart = (index) => {
      if (!trophyRefs.current[index]) return

      // Apply a subtle animation on touch
      trophyRefs.current[index].style.transform = `
        perspective(1000px) 
        rotateX(20deg) 
        rotateY(-5deg)
        scale(1.05)
      `

      // Reset after animation
      setTimeout(() => {
        if (trophyRefs.current[index]) {
          trophyRefs.current[index].style.transform = `
            perspective(1000px) 
            rotateX(15deg) 
            rotateY(-15deg)
          `
        }
      }, 500)
    }

    // Add touch event listeners to trophy elements
    trophyRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.addEventListener("touchstart", () => handleTouchStart(index))
      }
    })

    // Cleanup
    return () => {
      trophyRefs.current.forEach((ref) => {
        if (ref) {
          ref.removeEventListener("touchstart", handleTouchStart)
        }
      })
    }
  }, [isLoaded])

  useEffect(() => {
    // Create an intersection observer to detect when the prize section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        // If the section is visible and we haven't triggered the confetti yet
        if (entry.isIntersecting && !hasTriggeredConfetti.current) {
          hasTriggeredConfetti.current = true

          // Set loaded after a short delay to trigger staggered animations
          setIsLoaded(true)
          setShowConfetti(true)

          // Hide confetti after animation completes
          const confettiTimer = setTimeout(() => {
            setShowConfetti(false)
          }, 7000)

          return () => clearTimeout(confettiTimer)
        }
      },
      {
        root: null, // viewport
        threshold: 0.3, // trigger when 30% of the element is visible
        rootMargin: "0px",
      },
    )

    // Start observing the prize section
    if (prizeSectionRef.current) {
      observer.observe(prizeSectionRef.current)
    }

    // Cleanup observer on component unmount
    return () => {
      if (prizeSectionRef.current) {
        observer.unobserve(prizeSectionRef.current)
      }
    }
  }, [])

  // Generate confetti elements
  const generateConfetti = () => {
    return Array.from({ length: confettiCount }).map((_, i) => {
      const size = Math.random() * 10 + 5
      const colorIndex = Math.floor(Math.random() * 5)
      const colors = [
        "bg-yellow-400", // gold
        "bg-gray-300", // silver
        "bg-amber-700", // bronze
        "bg-blue-400", // blue
        "bg-white", // white
      ]

      return {
        id: i,
        left: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size * (Math.random() * 0.8 + 0.2)}px`, // Slightly rectangular
        color: colors[colorIndex],
        delay: `${Math.random() * 5}s`,
        duration: `${Math.random() * 3 + 5}s`,
        rotation: `${Math.random() * 360}deg`,
        rotationSpeed: `${Math.random() * 10 + 5}s`,
        rotationDirection: Math.random() > 0.5 ? "normal" : "reverse",
        shape: Math.random() > 0.7 ? "rounded-full" : Math.random() > 0.5 ? "rounded" : "",
      }
    })
  }

  // Function to generate random sparkle positions
  const generateSparkles = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${1 + Math.random() * 3}s`,
    }))
  }

  // Generate floating elements
  const generateFloatingElements = (count) => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 30 + 20
      const type = Math.random() > 0.7 ? "trophy" : Math.random() > 0.5 ? "coin" : "star"

      return {
        id: i,
        type,
        size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${15 + Math.random() * 20}s`,
        opacity: Math.random() * 0.2 + 0.05,
        rotation: Math.random() * 360,
      }
    })
  }

  const confetti = generateConfetti()
  const sparkles = generateSparkles(30)
  const floatingElements = generateFloatingElements(15)

  return (
    <div className="relative bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0f172a] p-8 pt-12 pb-20 text-center flex flex-col items-center overflow-hidden min-h-screen">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-radial-gradient opacity-70"></div>

        {/* Light beams */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full">
          <div className="light-beam light-beam-1"></div>
          <div className="light-beam light-beam-2"></div>
          <div className="light-beam light-beam-3"></div>
        </div>

        {/* Floating background elements */}
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute floating-element"
            style={{
              left: element.left,
              top: element.top,
              opacity: element.opacity,
              animationDelay: element.animationDelay,
              animationDuration: element.animationDuration,
            }}
          >
            {element.type === "trophy" ? (
              <Trophy
                style={{
                  width: `${element.size}px`,
                  height: `${element.size}px`,
                  transform: `rotate(${element.rotation}deg)`,
                }}
                className="text-yellow-300"
              />
            ) : element.type === "coin" ? (
              <div
                className="rounded-full bg-yellow-400"
                style={{
                  width: `${element.size}px`,
                  height: `${element.size}px`,
                  boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)",
                }}
              ></div>
            ) : (
              <Star
                style={{
                  width: `${element.size}px`,
                  height: `${element.size}px`,
                  transform: `rotate(${element.rotation}deg)`,
                }}
                className="text-yellow-200"
              />
            )}
          </div>
        ))}

        {/* Sparkles */}
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute sparkle"
            style={{
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animationDelay: sparkle.animationDelay,
              animationDuration: sparkle.animationDuration,
            }}
          ></div>
        ))}

        {/* Particle grid */}
        <div className="absolute inset-0 particle-grid"></div>
      </div>

      {/* Confetti Container */}
      {showConfetti && (
        <div ref={confettiRef} className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confetti.map((item) => (
            <div
              key={item.id}
              className={`absolute top-0 ${item.color} ${item.shape} confetti-item`}
              style={{
                left: item.left,
                width: item.width,
                height: item.height,
                animationDelay: item.delay,
                animationDuration: item.duration,
                transform: `rotate(${item.rotation})`,
                opacity: 0,
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Main Prize Pool Announcement */}
      <div ref={prizeSectionRef} className="mb-8 md:mb-14 relative z-10">
        <div className="relative inline-block">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wider mb-3 text-white relative z-10">
            PRIZE POOL
            <span className="absolute -inset-1 bg-white-500 bg-opacity-30 blur-lg -z-10 rounded-lg"></span>
          </h1>
          <div className="absolute -inset-4 bg-blue-400 bg-opacity-20 blur-xl -z-20 rounded-full pulse-slow"></div>
        </div>
        <div className="text-lg md:text-2xl font-medium mb-2 text-white relative">
          Total prize pool:
          <span className="relative inline-block ml-2">
            <span className="text-yellow-400 font-extrabold text-3xl md:text-5xl tracking-wide relative z-10">RM 5,000</span>
            <span className="absolute -inset-2 bg-yellow-400 bg-opacity-10 blur-md -z-10 rounded-lg pulse-glow"></span>
          </span>
        </div>
      </div>

      {/* Top 3 Prizes - Triangle Formation */}
      <div className="w-full max-w-6xl mx-auto relative z-10 mb-8 md:mb-16">
        {/* First Place - Top Center */}
        <div
          className={`w-full flex justify-center mb-4 md:mb-10 -mt-6 md:-mt-10 transition-all duration-1000 ${
            isLoaded ? "opacity-100 transform-none" : "opacity-0 -translate-y-10"
          }`}
        >
          <div
            className="relative trophy-wrapper-3d"
            onMouseMove={(e) => handleMouseMove(e, 0)}
            onMouseLeave={() => handleMouseLeave(0)}
          >
            <div
              ref={(el) => (trophyRefs.current[0] = el)}
              className="trophy-container-3d relative"
              style={{
                transform: `perspective(1000px) rotateX(15deg) rotateY(-15deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 0.3s ease",
              }}
            >
              {/* 3D Shadow */}
              <div className="absolute w-36 sm:w-48 h-8 sm:h-12 rounded-full bg-black/20 blur-md -bottom-6 left-1/2 transform -translate-x-1/2 -z-10"></div>

              {/* Glow effect */}
              <div className="absolute -inset-6 bg-yellow-400/30 blur-3xl rounded-full z-0"></div>
              <div className="absolute -inset-3 bg-yellow-300/40 blur-xl rounded-full z-0"></div>

              {/* Laurel Wreath with 3D effect */}
              <div className="absolute inset-0 w-full h-full" style={{ transform: "translateZ(5px)" }}>
                <div className="laurel-left absolute left-0 w-12 sm:w-16 h-24 sm:h-32 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-90"></div>
                <div className="laurel-right absolute right-0 w-12 sm:w-16 h-24 sm:h-32 bg-gradient-to-l from-yellow-300 to-yellow-500 opacity-90"></div>
              </div>

              {/* Stars with 3D effect - Centered */}
              <div className="absolute stars-container" style={{ transform: "translateZ(15px)" }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-300 mx-1 star-3d"
                    size={i % 2 === 0 ? (window.innerWidth < 640 ? 12 : 16) : window.innerWidth < 640 ? 8 : 12}
                  />
                ))}
              </div>

              {/* Trophy with 3D effect */}
              <div
                className="w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center relative z-10 mx-auto"
                style={{ transform: "translateZ(20px)" }}
              >
                <div className="trophy-3d-gold">
                  <Trophy className="text-yellow-400 w-24 h-24 sm:w-32 sm:h-32 trophy-icon-3d" />
                </div>
              </div>

              {/* Badge with Number - 3D effect */}
              <div
                className="absolute -left-2 sm:-left-4 -bottom-2 sm:-bottom-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-4 border-yellow-600 flex items-center justify-center z-20 badge-3d"
                style={{ transform: "translateZ(25px)" }}
              >
                <span className="text-white font-bold text-lg sm:text-xl">#1</span>
              </div>

              {/* Prize Amount Ribbon with 3D effect */}
              <div
                className="absolute -bottom-10 sm:-bottom-12 left-1/2 transform -translate-x-1/2 w-36 sm:w-48 h-10 sm:h-12"
                style={{ transform: "translateZ(10px)" }}
              >
                <div className="ribbon-blue-3d w-full h-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl sm:text-2xl">RM2,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second and Third Place Row */}
        <div className="flex flex-wrap justify-center gap-12 sm:gap-16 md:gap-32">
          {/* Second Place - Bottom Left */}
          <div
            className={`transition-all duration-1000 ${
              isLoaded ? "opacity-100 transform-none" : "opacity-0 -translate-x-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div
              className="relative trophy-wrapper-3d"
              onMouseMove={(e) => handleMouseMove(e, 1)}
              onMouseLeave={() => handleMouseLeave(1)}
            >
              <div
                ref={(el) => (trophyRefs.current[1] = el)}
                className="trophy-container-3d relative"
                style={{
                  transform: `perspective(1000px) rotateX(15deg) rotateY(-15deg)`,
                  transformStyle: "preserve-3d",
                  transition: "transform 0.3s ease",
                }}
              >
                {/* 3D Shadow */}
                <div className="absolute w-32 sm:w-44 h-8 sm:h-10 rounded-full bg-black/20 blur-md -bottom-6 left-1/2 transform -translate-x-1/2 -z-10"></div>

                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gray-300 bg-opacity-30 blur-xl rounded-full z-0 trophy-glow"></div>

                {/* Laurel Wreath with 3D effect */}
                <div className="absolute inset-0 w-full h-full" style={{ transform: "translateZ(5px)" }}>
                  <div className="laurel-left absolute left-0 w-10 sm:w-14 h-20 sm:h-28 bg-gradient-to-r from-gray-200 to-gray-400 opacity-90"></div>
                  <div className="laurel-right absolute right-0 w-10 sm:w-14 h-20 sm:h-28 bg-gradient-to-l from-gray-200 to-gray-400 opacity-90"></div>
                </div>

                {/* Stars with 3D effect - Centered */}
                <div className="absolute stars-container" style={{ transform: "translateZ(15px)" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-gray-300 mx-1 star-3d"
                      size={i % 2 === 0 ? (window.innerWidth < 640 ? 10 : 14) : window.innerWidth < 640 ? 6 : 10}
                    />
                  ))}
                </div>

                {/* Trophy with 3D effect */}
                <div
                  className="w-24 h-24 sm:w-36 sm:h-36 flex items-center justify-center relative z-10 mx-auto"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <div className="trophy-3d-silver">
                    <Trophy className="text-gray-300 w-20 h-20 sm:w-28 sm:h-28 trophy-icon-3d" />
                  </div>
                </div>

                {/* Badge with Number - 3D effect */}
                <div
                  className="absolute -left-2 sm:-left-4 -bottom-2 sm:-bottom-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 border-4 border-gray-500 flex items-center justify-center z-20 badge-3d"
                  style={{ transform: "translateZ(25px)" }}
                >
                  <span className="text-white font-bold text-lg sm:text-xl">#2</span>
                </div>

                {/* Prize Amount Ribbon with 3D effect */}
                <div
                  className="absolute -bottom-10 sm:-bottom-12 left-1/2 transform -translate-x-1/2 w-36 sm:w-48 h-10 sm:h-12"
                  style={{ transform: "translateZ(10px)" }}
                >
                  <div className="ribbon-blue-3d w-full h-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl sm:text-2xl">RM1,500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Third Place - Bottom Right */}
          <div
            className={`transition-all duration-1000 ${
              isLoaded ? "opacity-100 transform-none" : "opacity-0 translate-x-10"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div
              className="relative trophy-wrapper-3d"
              onMouseMove={(e) => handleMouseMove(e, 2)}
              onMouseLeave={() => handleMouseLeave(2)}
            >
              <div
                ref={(el) => (trophyRefs.current[2] = el)}
                className="trophy-container-3d relative"
                style={{
                  transform: `perspective(1000px) rotateX(15deg) rotateY(-15deg)`,
                  transformStyle: "preserve-3d",
                  transition: "transform 0.3s ease",
                }}
              >
                {/* 3D Shadow */}
                <div className="absolute w-32 sm:w-44 h-8 sm:h-10 rounded-full bg-black/20 blur-md -bottom-6 left-1/2 transform -translate-x-1/2 -z-10"></div>

                {/* Glow effect */}
                <div className="absolute -inset-4 bg-amber-700 bg-opacity-30 blur-xl rounded-full z-0 trophy-glow"></div>

                {/* Laurel Wreath with 3D effect */}
                <div className="absolute inset-0 w-full h-full" style={{ transform: "translateZ(5px)" }}>
                  <div className="laurel-left absolute left-0 w-10 sm:w-14 h-20 sm:h-28 bg-gradient-to-r from-amber-600 to-amber-800 opacity-90"></div>
                  <div className="laurel-right absolute right-0 w-10 sm:w-14 h-20 sm:h-28 bg-gradient-to-l from-amber-600 to-amber-800 opacity-90"></div>
                </div>

                {/* Stars with 3D effect - Centered */}
                <div className="absolute stars-container" style={{ transform: "translateZ(15px)" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-red-400 mx-1 star-3d"
                      size={i % 2 === 0 ? (window.innerWidth < 640 ? 10 : 14) : window.innerWidth < 640 ? 6 : 10}
                    />
                  ))}
                </div>

                {/* Trophy with 3D effect */}
                <div
                  className="w-24 h-24 sm:w-36 sm:h-36 flex items-center justify-center relative z-10 mx-auto"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <div className="trophy-3d-bronze">
                    <Trophy className="text-amber-700 w-20 h-20 sm:w-28 sm:h-28 trophy-icon-3d" />
                  </div>
                </div>

                {/* Badge with Number - 3D effect */}
                <div
                  className="absolute -left-2 sm:-left-4 -bottom-2 sm:-bottom-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 border-4 border-amber-700 flex items-center justify-center z-20 badge-3d"
                  style={{ transform: "translateZ(25px)" }}
                >
                  <span className="text-white font-bold text-lg sm:text-xl">#3</span>
                </div>

                {/* Prize Amount Ribbon with 3D effect */}
                <div
                  className="absolute -bottom-10 sm:-bottom-12 left-1/2 transform -translate-x-1/2 w-36 sm:w-48 h-10 sm:h-12"
                  style={{ transform: "translateZ(10px)" }}
                >
                  <div className="ribbon-blue-3d w-full h-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl sm:text-2xl">RM1,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Place - Centered */}
      <div className="flex justify-center mt-6 sm:mt-10">
        <div
          className={`transition-all duration-1000 ${
            isLoaded ? "opacity-100 transform-none" : "opacity-0 -translate-y-10"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div
            className="relative trophy-wrapper-3d"
            onMouseMove={(e) => handleMouseMove(e, 3)}
            onMouseLeave={() => handleMouseLeave(3)}
          >
            <div
              ref={(el) => (trophyRefs.current[3] = el)}
              className="trophy-container-3d relative"
              style={{
                transform: `perspective(1000px) rotateX(15deg) rotateY(-15deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 0.3s ease",
              }}
            >
              {/* 3D Shadow */}
              <div className="absolute w-28 sm:w-40 h-6 sm:h-8 rounded-full bg-black/20 blur-md -bottom-6 left-1/2 transform -translate-x-1/2 -z-10"></div>

              {/* Glow effect */}
              <div className="absolute -inset-4 bg-blue-200 bg-opacity-30 blur-xl rounded-full z-0 trophy-glow"></div>

              {/* Laurel Wreath with 3D effect */}
              <div className="absolute inset-0 w-full h-full" style={{ transform: "translateZ(5px)" }}>
                <div className="laurel-left absolute left-0 w-8 sm:w-12 h-16 sm:h-24 bg-gradient-to-r from-blue-100 to-blue-300 opacity-70"></div>
                <div className="laurel-right absolute right-0 w-8 sm:w-12 h-16 sm:h-24 bg-gradient-to-l from-blue-100 to-blue-300 opacity-70"></div>
              </div>

              {/* Stars with 3D effect - Centered */}
              <div className="absolute stars-container" style={{ transform: "translateZ(15px)" }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-blue-200 mx-1 star-3d"
                    size={i % 2 === 0 ? (window.innerWidth < 640 ? 8 : 12) : window.innerWidth < 640 ? 4 : 8}
                  />
                ))}
              </div>

              {/* Trophy with 3D effect */}
              <div
                className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center relative z-10 mx-auto"
                style={{ transform: "translateZ(20px)" }}
              >
                <div className="trophy-3d-honorable">
                  <Trophy className="text-blue-200 w-16 h-16 sm:w-24 sm:h-24 trophy-icon-3d" />
                </div>
              </div>

              {/* Badge with Number - 3D effect */}
              <div
                className="absolute -left-2 sm:-left-4 -bottom-2 sm:-bottom-4 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 border-4 border-orange-500 flex items-center justify-center z-20 badge-3d"
                style={{ transform: "translateZ(25px)" }}
              >
                <span className="text-white font-bold text-base sm:text-lg">#4</span>
              </div>

              {/* Prize Amount Ribbon with 3D effect */}
              <div
                className="absolute -bottom-10 sm:-bottom-12 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 h-8 sm:h-10"
                style={{ transform: "translateZ(10px)" }}
              >
                <div className="ribbon-blue-3d w-full h-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">RM500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg mt-20 relative z-10">
        <p className="text-lg font-medium text-white">Join our competition for a chance to win these amazing prizes!</p>
      </div>

      {/* CSS for styling */}
      <style jsx>{`
        .bg-radial-gradient {
          background: radial-gradient(circle at 50% 0%, rgba(79, 70, 229, 0.25) 0%, rgba(17, 24, 39, 0.2) 50%, rgba(15, 23, 42, 0) 100%);
        }
        
        .light-beam {
          position: absolute;
          width: 120px;
          height: 100%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.0));
          transform-origin: top center;
          animation: rotate-beam 20s infinite linear;
          opacity: 0.5;
        }
        
        .light-beam-1 {
          animation-duration: 30s;
          transform: rotate(30deg);
        }
        
        .light-beam-2 {
          animation-duration: 25s;
          animation-delay: -5s;
          transform: rotate(-20deg);
        }
        
        .light-beam-3 {
          animation-duration: 35s;
          animation-delay: -10s;
          transform: rotate(10deg);
        }
        
        @keyframes rotate-beam {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .floating-element {
          animation: float-around infinite ease-in-out;
          will-change: transform;
        }
        
        @keyframes float-around {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -15px) rotate(5deg);
          }
          50% {
            transform: translate(0, -30px) rotate(0deg);
          }
          75% {
            transform: translate(-20px, -15px) rotate(-5deg);
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
        }
        
        .sparkle {
          background-color: white;
          border-radius: 50%;
          animation: twinkle-sparkle infinite ease-in-out alternate;
        }
        
        @keyframes twinkle-sparkle {
          0% {
            opacity: 0.1;
            transform: scale(0.8);
          }
          100% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }
        
        .particle-grid {
          background-image: 
            radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent255,255,0.15) 1px, transparent 1px),
            radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px, 25px 25px;
          background-position: 0 0, 12.5px 12.5px;
          animation: move-grid 60s linear infinite;
        }
        
        @keyframes move-grid {
          0% {
            background-position: 0 0, 12.5px 12.5px;
          }
          100% {
            background-position: 50px 50px, 62.5px 62.5px;
          }
        }
        
        .pulse-slow {
          animation: pulse-animation 4s infinite alternate;
        }
        
        .pulse-glow {
          animation: pulse-animation 2s infinite alternate;
        }
        
        @keyframes pulse-animation {
          0% {
            opacity: 0.3;
            transform: scale(0.95);
          }
          100% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }
        
        .trophy-glow {
          animation: glow-pulse 3s infinite alternate;
        }
        
        @keyframes glow-pulse {
          0% {
            opacity: 0.3;
            transform: scale(0.9);
          }
          100% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        
        .glass-card {
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .laurel-left, .laurel-right {
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 200'%3E%3Cpath d='M50,0 C20,40 20,160 50,200' stroke='black' strokeWidth='8' fill='none'/%3E%3C/svg%3E");
          mask-size: contain;
          mask-repeat: no-repeat;
          mask-position: center;
        }

        .laurel-right {
          transform: scaleX(-1);
        }

        /* 3D Trophy Styles */
        .trophy-wrapper-3d {
          cursor: pointer;
          transition: all 0.3s ease;
          perspective: 1000px;
        }

        .trophy-container-3d {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }

        /* Stars container for perfect alignment */
        .stars-container {
          top: -8px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .trophy-3d-gold {
          position: relative;
          filter: drop-shadow(0 10px 15px rgba(255, 215, 0, 0.3));
        }

        .trophy-3d-gold::before {
          content: '';
          position: absolute;
          inset: -5px;
          background: linear-gradient(135deg, #ffd700, #ffcc00, #ffd700);
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0.5;
          z-index: -1;
        }

        .trophy-3d-silver {
          position: relative;
          filter: drop-shadow(0 10px 15px rgba(192, 192, 192, 0.3));
        }

        .trophy-3d-silver::before {
          content: '';
          position: absolute;
          inset: -5px;
          background: linear-gradient(135deg, #e0e0e0, #c0c0c0, #e0e0e0);
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0.5;
          z-index: -1;
        }

        .trophy-3d-bronze {
          position: relative;
          filter: drop-shadow(0 10px 15px rgba(205, 127, 50, 0.3));
        }

        .trophy-3d-bronze::before {
          content: '';
          position: absolute;
          inset: -5px;
          background: linear-gradient(135deg, #cd7f32, #b87333, #cd7f32);
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0.5;
          z-index: -1;
        }

        .trophy-3d-honorable {
          position: relative;
          filter: drop-shadow(0 10px 15px rgba(173, 216, 230, 0.3));
        }

        .trophy-3d-honorable::before {
          content: '';
          position: absolute;
          inset: -5px;
          background: linear-gradient(135deg, #add8e6, #87ceeb, #add8e6);
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0.5;
          z-index: -1;
        }

        .trophy-icon-3d {
          filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3));
          transition: all 0.3s ease;
        }

        .trophy-wrapper-3d:hover .trophy-icon-3d {
          filter: drop-shadow(0 0 12px currentColor);
          transform: translateY(-5px) scale(1.05);
        }

        .star-3d {
          filter: drop-shadow(0 0 5px currentColor);
          transition: all 0.3s ease;
        }

        .trophy-wrapper-3d:hover .star-3d {
          animation: twinkle-3d 1.5s infinite alternate;
          filter: drop-shadow(0 0 8px currentColor);
        }

        @keyframes twinkle-3d {
          0% {
            opacity: 0.7;
            transform: scale(1) rotate(0deg);
          }
          100% {
            opacity: 1;
            transform: scale(1.3) rotate(15deg);
          }
        }

        .badge-3d {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .trophy-wrapper-3d:hover .badge-3d {
          transform: translateZ(25px) rotate(15deg) scale(1.1);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
        }

        .ribbon-blue-3d {
          position: relative;
          background: linear-gradient(to right, #2563eb, #3b82f6, #60a5fa);
          clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
          transform-style: preserve-3d;
        }

        .ribbon-blue-3d::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 10%;
          right: 10%;
          height: 30%;
          background: rgba(147, 197, 253, 0.3);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        /* Confetti Animation */
        .confetti-item {
          position: absolute;
          animation: confetti-fall linear forwards;
          will-change: transform, opacity;
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh + 20px)) rotate(360deg);
            opacity: 0;
          }
        }

        /* Improved alignment for trophy elements */
        .trophy-wrapper-3d {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .ribbon-blue-3d {
          text-align: center;
        }

        @media (max-width: 640px) {
          .trophy-wrapper-3d {
            transform: scale(0.9);
          }
          
          .trophy-container-3d {
            margin-bottom: 1.5rem;
          }
          
          .stars-container {
            top: -6px;
          }
          
          .badge-3d {
            border-width: 3px;
          }
          
          .ribbon-blue-3d {
            font-size: 0.9rem;
          }
          
          /* Simplify animations on mobile for better performance */
          .light-beam {
            display: none;
          }
          
          .floating-element {
            opacity: 0.05 !important;
          }
          
          .particle-grid {
            background-size: 30px 30px, 15px 15px;
          }
        }
      `}</style>
    </div>
  )
}

export default Prize
