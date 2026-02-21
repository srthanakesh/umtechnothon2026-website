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
      name: "Engineering Society Universiti Malaya",
      logo: "/logos/ESUM_Logo_transparentBG.png",
      description:
        "ESUM is the umbrella engineering society at UM, representing over 700 students across all engineering disciplines with industrial visits, talks, and networking events.",
    },
    {
      id: 2,
      name: "Institution of Mechanical Engineers Universiti Malaya Student Chapter (IMechE UM SC)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/IMechE UM SC - IMechE UM PRM.png",
      description:
        "IMechE UM SC hosts industrial visits, technical talks, and competitions to develop mechanical engineers’ skills and professionalism.",
    },
    {
      id: 3,
      name: "Angkatan Kejuruteraan Islam Universiti Malaya (AKIUM)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/LOGO AKIUM24 - akiumofficial.png",
      description:
        "AKIUM guides UM engineering students in academics, entrepreneurship, and welfare while nurturing Islamic spiritual values through workshops and community events.",
    },
    {
      id: 4,
      name: "Developer Student Club Utem",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/Logo DSC UTeM - Sharveena 0710.png",
      description:
        "DSC Utem empowers students with hands-on coding workshops, hackathons, and networking opportunities to build real-world projects.",
    },
    {
      id: 5,
      name: "Malaya Electrical Students Association (MESA)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/MESA_Logo-removebg-preview - MESA.png",
      description:
        "MESA is the official association for UM Electrical Engineering students, coordinating academic and extracurricular activities for all members.",
    },
    {
      id: 6,
      name: "DaXiang Universiti Malaya",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/IMG_3497 - JUN JIE TANG.png",
      description:
        "The Crosstalk Performance Night (DAXIANG) was organized and held by the crosstalk group from PBCUM, with the members also serving as performers for the event.",
    },
    {
      id: 7,
      name: "Google Developer Group on Campus Universiti Sains Malaysia (GDGoC USM)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/GDG USM logo (centered) - Chi San.png",
      description:
        "GDGoC USM connects students to Google technologies through peer learning, tech events, and professional development opportunities.",
    },
    {
      id: 8,
      name: "Biomedical Engineering Student Club Universiti Malaya (BMESC UM)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/BME Club Logo transparent 1 - Aisar Iqbal.png",
      description:
        "BMESC UM bridges biomedical engineering students and faculty, organizing academic and industry-related activities to enhance student experience.",
    },
    {
      id: 9,
      name: "Persatuan Mahasiswa Fakulti Teknologi dan Sains Maklumat (PERTAMA)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/LOGO PERTAMA - MUHAMMAD NUR AMJADH BIN ASABDEEN.png",
      description:
        "PERTAMA at UKM organizes welfare, academic, and community activities, serving as a link between students and faculty administration.",
    },
    {
      id: 10,
      name: "Robotics Engineering Community (REC)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/REC LOGO - Rec 2425.PNG",
      description:
        "REC UM is a platform for robotics enthusiasts to collaborate, learn, and compete in robotics through hands-on projects and knowledge sharing.",
    },
    {
      id: 11,
      name: "Taylor's American Degree Program Engineering Society (Taylor's ADP Engineering Society)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/Trans Logo (Black) - Taylors Engineering Society 2021.png",
      description:
        "Taylor's ADP Engineering Society inspires innovation and problem-solving through workshops, projects, and networking for engineering students.",
    },
    {
      id: 12,
      name: " AMERICAN SOCIETY OF HEATING, REFRIGERATING AND AIR-CONDITIONING ENGINEERS (ASHRAE)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/ASHRAE - XUAN LI TOH.png",
      description:
        "ASHRAE UM Student Branch offers students industry exposure and technical growth in HVAC&R through research, networking, and projects.",
    },
    {
      id: 13,
      name: "UM MAKERS CLUB",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/Screenshot_2025-04-04_233254-removebg-preview - UM Makers Club 2025.png",
      description:
        "UM Makers Club promotes STEAM through hands-on, collaborative learning and empowers students to innovate and create.",
    },
    {
      id: 14,
      name: "Google Developer Group On Campus(GDGoC) SEGi X TarUMT",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/DSC SEGi University Horizontal color - GDSC SEGi University.png",
      description:
        "GDG SEGi X TarUMT is a student-led tech community focused on learning, collaboration, and building impactful solutions.",
    },
    {
      id: 15,
      name: "Google Developer Student Club UTP (GDSC-UTP)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/LOGO GDSC-UTP - Putriani Azlar.png",
      description:
        "GDSC-UTP connects students through workshops, tech talks, and collaborative projects to foster growth and innovation.",
    },
    {
      id: 16,
      name: "Developer Student Clubs Universiti Kuala Lumpur",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/DSC UNIKL LOGO - Marissa Jamili.png",
      description:
        "DSC UniKL supports students in web/mobile development, machine learning, and tech skills through resources and community events.",
    },
    {
      id: 17,
      name: "MYTECH Career Fair 2025",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/MyTech Logo - Elysia Yung.png",
      description:
        "MYTECH Career Fair 2025 connects students with tech companies, offering industry insights and internship opportunities.",
    },
    {
      id: 18,
      name: "Programming League National (PLN)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/478bca8f-27cb-4df3-9f34-7f36ba826478 - Programming League National.jpeg",
      description:
        "PLN is a premier national programming competition for university students to showcase coding skills and compete with peers.",
    },
    {
      id: 19,
      name: "Malaysian Youth FinTech Association (MYFintT)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/MYFinT Logo - MYFinT External Relations.png",
      description:
        "MYFinT empowers Malaysian youth in FinTech through networking, education, and industry events to foster innovation.",
    },
    {
      id: 20,
      name: "Institute of Electrical and Electronics Engineering University of Nottingham Student Branch (IEEE UNM SB)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/IEEE_UNM_SB_LOGO - Marcus Yew.png",
      description:
        "IEEE UNM SB fosters innovation and leadership among engineering students through hands-on projects, workshops, and industry engagement.",
    },
    {
      id: 21,
      name: "IEEE Student Branch Universiti Putra Malaysia",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/IEEESB_LATEST - LEE YI LIN _ UPM.png",
      description:
        "IEEE SB UPM advances technology for humanity with skill-building activities, networking, and partnerships with industry.",
    },
    {
      id: 22,
      name: "UNIVERSITI MALAYA STUDENT UNION FACULTY COMPUTER SCIENCE AND INFORMATION TECHNOLOGY",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/UMSU_FCSIT_20242025_Letter_Head-removebg-preview - UMSU FCSIT.png",
      description:
        "UMSU FCSIT advocates for student interests and autonomy, bridging students and administration with initiatives and advocacy.",
    },
    {
      id: 23,
      name: "The Computer Science & Information Technology Faculty Representative Council (ComCil)",
      logo: "/logos/Organisation Logo  (png format & transparent background) (File responses)/Official Comcil Logo 2023 - NITESH A_L PRAKASH _ UPM.png",
      description:
        "ComCil UPM promotes academic and personal growth in FCSIT through leadership activities, events, and student support.",
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