import React from "react";

class MediaPartnersSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      direction: 0, // -1 for left, 1 for right
      isAnimating: false,
      animationKey: 0 // Key to force animation restart
    };
  }

  // Media partners data
  mediaPartners = [
    {
      id: 1,
      name: "APU Forensics and Cyber Security Research Center - Student Section (FSeC-SS)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/FSEC LOGO - Natasha Najwa.png",
      description:
        "FSeC-SS connects students with industry experts to develop essential skills in cybersecurity and digital forensics through collaborative research and networking.",
    },
    {
      id: 2,
      name: "Chemical Engineering Undergraduate Club (CEUC)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/CEUC Logo (4) - CEUC Universiti Malaya.png",
      description:
        "CEUC is the official Chemical Engineering student club at UM, dedicated to supporting undergraduates through inclusive events, resources, and student-department communication.",
    },
    {
      id: 3,
      name: "Robotics Engineering Community (REC)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/REC LOGO - TAN YIN JIE JACQLINE.png",
      description:
        "REC is UM’s student-led robotics club, focusing on robot design and programming through competitive projects like Robocon.",
    },
    {
      id: 4,
      name: "ASHRAE UM Student Branch",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/ASHRAE - ASHRAE UM.PNG",
      description:
        "ASHRAE UM develops engineering talent in sustainable building technologies and HVAC&R through professional talks, competitions, and hands-on industry exposure.",
    },
    {
      id: 5,
      name: "Developer Student Clubs UniKL (DSC UNIKL)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/DSC UNIKL LOGO copy - DSC UniKL.png",
      description:
        "DSC UniKL empowers students in AI and emerging technologies through hands-on workshops and industry-linked innovation projects.",
    },
    {
      id: 6,
      name: "IMechE UM Student Chapter",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/IMechE UMSC Logo - Transparent Bg - Cheah Ui Zhe.png",
      description:
        "IMechE UMSC is a large-scale student chapter at UM that prepares future mechanical engineers for global careers through industry networking and high-impact technical events.",
    },
    {
      id: 7,
      name: "UMHackathon 2026 (UMH2026)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/UMH2026 LOGO - UMHackathon.png",
      description:
        "UMHackathon is a PEKOM-led competition where teams build data science and machine learning MVPs to solve technical challenges.",
    },
    {
      id: 8,
      name: "UM Cybersecurity Summit 2026",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/UMCS Logo Dark.png",
      description:
        "UMCS 2026 is a joint-effort cybersecurity event on May 16th at UM, featuring technical workshops and CTF competitions.",
    },
    {
      id: 9,
      name: "Nuclear Engineering Student Society Universiti Teknologi Malaysia (NESS UTM)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/NESS (Transparent) - syahindah salikin.png",
      description:
        "NESS is a student-led nuclear engineering chapter at UTM that advances professional skills through global programs, industry visits, and technical debates.",
    },
    {
      id: 10,
      name: "The Institution of Engineers Malaysia Students Section UTHM (IEMSS UTHM)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/SAVE_20260317_240041 - Ting En Koay.jpg",
      description:
        "IEM-SS UTHM is a student-led organization dedicated to professional growth and community engagement for future engineers.",
    },
    {
      id: 11,
      name: "UM Makersclub",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/Makers Club PNG - See x.png",
      description:
        "UM Makers Club is a student-led community that turns ideas into reality through rapid prototyping and digital fabrication workshops.",
    },
    {
      id: 12,
      name: "Developer Student Club UTeM",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/DSC UTeM Background Free - Haris Suresh.png",
      description:
        "DSC is a university-based community for students interested in developer technologies. It provides a peer-to-peer learning environment where members build real-world solutions for local businesses and the community.",
    },
    {
      id: 13,
      name: "Google Developer Group on Campus Universiti Sains Malaysia (GDGoC USM)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/GDG On Campus - Horizontal - Light -Trans - Navitha M.png",
      description:
        "GDG on Campus USM advances student development by providing a platform for peer learning, interpersonal growth, and hands-on experience with Google technologies.",
    },
    {
      id: 14,
      name: "IT Society MMU Cyberjaya (ITS)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/ITS_logo - LAW CHIN XUAN.png",
      description:
        "IT Society MMU is a Cyberjaya-based student community dedicated to fostering passion for computer science through technical events and industry engagement.",
    },
    {
      id: 15,
      name: "UNIVERISITI MALAYA STUDENT UNION FACULTY OF ENGINEERING ",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/UMSU Faculty of Engineering - Lee Wen Qua.png",
      description:
        "KMUM is the official student voice at UM, dedicated to representing student interests in university governance and supporting student-led initiatives.",
    },
    {
      id: 16,
      name: "SYTNECH Organization",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/inbound7210120407090917791 - Th QL.png",
      description:
        "SYNTECH is a student-led community that empowers students to innovate and develop real-world skills through workshops, industry connections, and hands-on projects.",
    },
    {
      id: 17,
      name: "Universiti Malaya Shell Eco Marathon Team",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/IMG_9671 - umsem.png",
      description:
        "UM-SEM is a student-led engineering team that represents Universiti Malaya in the global Shell Eco-marathon competition, focusing on automotive innovation and efficiency.",
    },
    {
      id: 18,
      name: "Society of Petroleum Engineer UiTM Students Chapter (SPE-UiTM SC)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/SPE-UiTM SC LOGO NO BG - Zahiruddin Nazri.png",
      description:
        "SPE UiTM is an award-winning student chapter that bridges the gap between academia and the energy industry through technical workshops and professional networking.",
    },
    {
      id: 19,
      name: "Taylor's ADP Engineering Society",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/TES Logo - Joel John Tan.png",
      description:
        "Taylor's ADP Engineering Society fosters a vibrant community for future engineers through practical projects, industry insights, and cross-disciplinary collaboration.",
    },
    {
      id: 20,
      name: "Google Developer Student Club Segi University (GDSC Segi)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/GDSC SEGi University Horizontal color - Ng Su Ying.png",
      description:
        "GDSC is an inclusive student tech community focused on Google developer tools, hands-on projects, and peer learning.",
    },
  ];

  goToPrevious = () => {
    if (this.state.isAnimating) return;
    
    const isFirstSlide = this.state.currentIndex === 0;
    const newIndex = isFirstSlide ? this.mediaPartners.length - 1 : this.state.currentIndex - 1;
    
    this.setState({ 
      isAnimating: true,
      direction: -1,
      animationKey: this.state.animationKey + 1 // Increment key to force animation restart
    });
    
    // Set a timeout to update the slide and reset animation state
    setTimeout(() => {
      this.setState({ 
        currentIndex: newIndex,
        isAnimating: false
      });
    }, 700); // Wait for animation to complete
  };

  goToNext = () => {
    if (this.state.isAnimating) return;
    
    const isLastSlide = this.state.currentIndex === this.mediaPartners.length - 1;
    const newIndex = isLastSlide ? 0 : this.state.currentIndex + 1;
    
    this.setState({ 
      isAnimating: true,
      direction: 1,
      animationKey: this.state.animationKey + 1 // Increment key to force animation restart
    });
    
    // Set a timeout to update the slide and reset animation state
    setTimeout(() => {
      this.setState({ 
        currentIndex: newIndex,
        isAnimating: false
      });
    }, 700); // Wait for animation to complete
  };

  goToSlide = (slideIndex) => {
    if (this.state.isAnimating || slideIndex === this.state.currentIndex) return;
    
    const direction = slideIndex > this.state.currentIndex ? 1 : -1;
    
    this.setState({ 
      isAnimating: true,
      direction: direction,
      animationKey: this.state.animationKey + 1 // Increment key to force animation restart
    });
    
    // Set a timeout to update the slide and reset animation state
    setTimeout(() => {
      this.setState({ 
        currentIndex: slideIndex,
        isAnimating: false
      });
    }, 700); // Wait for animation to complete
  };

  render() {
    const { currentIndex, direction, animationKey, isAnimating } = this.state;
    const currentPartner = this.mediaPartners[currentIndex];
    const nextIndex = direction > 0 
      ? (currentIndex === this.mediaPartners.length - 1 ? 0 : currentIndex + 1)
      : (currentIndex === 0 ? this.mediaPartners.length - 1 : currentIndex - 1);
    
    // Determine which partner to show during animation
    const displayPartner = isAnimating ? this.mediaPartners[nextIndex] : currentPartner;

    return (
      <div>
        {/* CSS Animations */}
        <style jsx>{`
          @keyframes slideInRight {
            from {
              transform: translate3d(100px, 20px, 0) scale(0.7) rotate(10deg);
              opacity: 0;
            }
            to {
              transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
              opacity: 1;
            }
          }
          
          @keyframes slideInLeft {
            from {
              transform: translate3d(-100px, 20px, 0) scale(0.7) rotate(-10deg);
              opacity: 0;
            }
            to {
              transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
              opacity: 1;
            }
          }
          
          @keyframes slideOutRight {
            from {
              transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
              opacity: 1;
            }
            to {
              transform: translate3d(100px, 20px, 0) scale(0.7) rotate(10deg);
              opacity: 0;
            }
          }
          
          @keyframes slideOutLeft {
            from {
              transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
              opacity: 1;
            }
            to {
              transform: translate3d(-100px, 20px, 0) scale(0.7) rotate(-10deg);
              opacity: 0;
            }
          }
          
          @keyframes slideInDownTitle {
            from {
              transform: translate3d(0, -50px, 0) scale(0.9);
              opacity: 0;
            }
            to {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 1;
            }
          }
          
          @keyframes slideInUpTitle {
            from {
              transform: translate3d(0, 50px, 0) scale(0.9);
              opacity: 0;
            }
            to {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 1;
            }
          }
          
          @keyframes slideOutDownTitle {
            from {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 1;
            }
            to {
              transform: translate3d(0, 50px, 0) scale(0.9);
              opacity: 0;
            }
          }
          
          @keyframes slideOutUpTitle {
            from {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 1;
            }
            to {
              transform: translate3d(0, -50px, 0) scale(0.9);
              opacity: 0;
            }
          }
          
          @keyframes fadeInUp {
            from {
              transform: translate3d(0, 30px, 0) scale(0.95);
              opacity: 0;
            }
            to {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 1;
            }
          }
          
          @keyframes fadeOutDown {
            from {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 1;
            }
            to {
              transform: translate3d(0, 30px, 0) scale(0.95);
              opacity: 0;
            }
          }
          
          .title-animate-in {
            animation: ${direction > 0 ? 'slideInDownTitle' : 'slideInUpTitle'} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          
          .logo-animate-in {
            animation: ${direction > 0 ? 'slideInRight' : 'slideInLeft'} 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s forwards;
          }
          
          .description-animate-in {
            animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards;
          }
          
          .title-animate-out {
            animation: ${direction > 0 ? 'slideOutUpTitle' : 'slideOutDownTitle'} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          
          .logo-animate-out {
            animation: ${direction > 0 ? 'slideOutLeft' : 'slideOutRight'} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          
          .description-animate-out {
            animation: fadeOutDown 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          
          .arrow-button:hover {
            transform: scale(1.1);
          }
          
          .arrow-button.left:hover {
            transform: scale(1.1) translateX(-5px);
          }
          
          .arrow-button.right:hover {
            transform: scale(1.1) translateX(5px);
          }
          
          .arrow-button:active {
            transform: scale(0.9);
          }
          
          .dot-button {
            height: 0.5rem;
            border-radius: 9999px;
            border: none;
            cursor: pointer;
            padding: 0;
            transition: width 0.3s ease, background-color 0.3s ease, transform 0.3s ease;
          }
          
          .dot-button:hover {
            transform: scale(1.2);
          }
          
          .dot-active {
            width: 2.5rem;
            background-color: white;
          }
          
          .dot-inactive {
            width: 1.5rem;
            background-color: #4b5563;
          }
          
          .dot-inactive:hover {
            background-color: #9ca3af;
          }
          
          .slider-container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          
          .content-container {
            position: relative;
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            padding: 0 4rem;
            min-height: 400px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          
          .partner-content {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          
          .partner-title {
            font-size: 1.75rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 2rem;
            opacity: 0;
            width: 100%;
          }
          
          .partner-logo-container {
            background-color: white;
            border-radius: 1.5rem;
            padding: 1.5rem;
            width: 16rem;
            height: 12rem;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            margin-bottom: 2rem;
            opacity: 0;
          }
          
          .partner-logo {
            width: auto;
            height: 100%;
            max-width: 90%;
            object-fit: contain;
          }
          
          .partner-description {
            text-align: center;
            max-width: 32rem;
            font-size: 1.125rem;
            line-height: 1.6;
            opacity: 0;
            width: 100%;
          }
        `}</style>

        <div style={{ 
          backgroundColor: "black", 
          color: "white", 
          padding: "4rem 1rem",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{ 
            maxWidth: "1200px", 
            margin: "0 auto", 
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <h1 style={{ 
              fontSize: "3rem", 
              fontWeight: "bold", 
              textAlign: "center", 
              marginBottom: "4rem" 
            }}>
              MEDIA PARTNERS
            </h1>

            <div className="slider-container" style={{ 
              position: "relative", 
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px"
            }}>
              {/* Left Arrow */}
              <button
                onClick={this.goToPrevious}
                className="arrow-button left"
                style={{
                  position: "absolute",
                  left: 0,
                  zIndex: 10,
                  padding: "1rem",
                  color: "white",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, color 0.3s ease"
                }}
                aria-label="Previous partner"
                disabled={isAnimating}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              {/* Partner Content */}
              <div className="content-container">
                {/* Using a key to force re-render and restart animations */}
                <div 
                  key={`partner-${animationKey}`} 
                  className="partner-content"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  <h2 className="partner-title title-animate-in">
                    {displayPartner.name}
                  </h2>

                  <div className="partner-logo-container logo-animate-in">
                    <img
                      src={displayPartner.logo || "/placeholder.svg"}
                      alt={`${displayPartner.name} logo`}
                      className="partner-logo"
                      style={
                        displayPartner.id === 10
                          ? { width: "150%", height: "150%", objectFit: "contain" }
                          : displayPartner.id === 15
                            ? { width: "200%", height: "200%", objectFit: "contain" }
                            : undefined
                      }
                    />
                  </div>

                  <p className="partner-description description-animate-in">
                    {displayPartner.description}
                  </p>
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={this.goToNext}
                className="arrow-button right"
                style={{
                  position: "absolute",
                  right: 0,
                  zIndex: 10,
                  padding: "1rem",
                  color: "white",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, color 0.3s ease"
                }}
                aria-label="Next partner"
                disabled={isAnimating}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            {/* Dots/Indicators */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "4rem",
              gap: "0.5rem"
            }}>
              {this.mediaPartners.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  onClick={() => this.goToSlide(slideIndex)}
                  className={`dot-button ${slideIndex === currentIndex ? 'dot-active' : 'dot-inactive'}`}
                  aria-label={`Go to slide ${slideIndex + 1}`}
                  disabled={isAnimating}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MediaPartnersSlider;