"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../context/UserProvider"

const FirstPage = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const [isMobile, setIsMobile] = useState(false)
  const [blurAmount, setBlurAmount] = useState(10) // Start with maximum blur
  const [opacity, setOpacity] = useState(0) // Start with 0 opacity

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Fade and blur animation effect for text, button and logos
  useEffect(() => {
    // Start with maximum blur and 0 opacity
    setBlurAmount(10)
    setOpacity(0)

    const animationDuration = 1500 // 1.5 seconds for the animation
    const steps = 20 // Number of steps in the animation
    const stepDuration = animationDuration / steps
    const decrementPerStep = 10 / steps

    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      setBlurAmount((prevBlur) => {
        const newBlur = prevBlur - decrementPerStep
        return newBlur < 0 ? 0 : newBlur
      })
      setOpacity(currentStep / steps)
      if (currentStep >= steps) {
        clearInterval(interval)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [])

  // Get button text and destination based on user status
  const getButtonProps = () => {
    if (!user) {
      return {
        buttontext: "JOIN US NOW!",
        destination: "/register"
      }
    } else if (!user.team_id) {
      return {
        buttontext: "REGISTER TEAM",
        destination: "/register-team"
      }
    } else {
      return {
        buttontext: "DASHBOARD",
        destination: "/team"
      }
    }
  }

  const { buttontext, destination } = getButtonProps()

  const handleButtonClick = () => {
    navigate(destination)
  }

  return (
    <>
      {/* Define the floating keyframes */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
      `}</style>
      <div
        className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0b0e14] to-[#1a1d23] p-4 md:p-10 ${
          !isMobile && "md:flex-row md:justify-between"
        }`}
      >
        <div
          className={`text-center p-4 ${isMobile ? "mt-0 w-full" : "ml-10 md:ml-40 md:p-8"}`}
          style={{
            filter: `blur(${blurAmount}px)`,
            opacity: opacity,
            transition: "filter 0.2s ease-out, opacity 0.2s ease-out",
          }}
        >
          <h2 className={`font-bold text-[#fafdff] mb-4 tracking-wider ${isMobile ? "text-5xl" : "text-2xl md:text-8xl"}`}>
            TURN
            <br />
            VIRTUAL
            <br />
            INTO
            <br />
            REALITY
          </h2>
          <button
            onClick={handleButtonClick}
            className={`bg-[#2dcefb] text-[#0b0e14] border-none py-3 px-6 font-bold cursor-pointer rounded transition duration-300 ease-in-out transform hover:bg-[#5da4cf] hover:scale-105 ${
              isMobile ? "text-xl w-1/2 mt-4" : "text-lg"
            }`}
          >
            {buttontext}
          </button>
        </div>

        {/* Logo section - only visible on desktop */}
        {!isMobile && (
          <div
            className="flex items-center justify-center h-full"
            style={{
              filter: `blur(${blurAmount}px)`,
              opacity: opacity,
              transition: "filter 0.2s ease-out, opacity 0.2s ease-out",
            }}
          >
            <div className="relative">
              <img
                src="/logos/technothon-logo-transparent.png"
                alt="Technothon 2026 Logo"
                className="h-full max-h-120 mr-10 md:mr-20"
                style={{
                  animation: "float 3s ease-in-out infinite",
                }}
              />
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-50 h-10 bg-black opacity-20 rounded-full"
                style={{ filter: "blur(25px)", bottom: "-8px" }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default FirstPage
