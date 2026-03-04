import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Timeline() {
  const [isMobile, setIsMobile] = useState(false);
  const timelineRef = useRef(null);

  // Track when the timeline enters and leaves the viewport
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  // Transform scrollYProgress to line height
  const lineHeight = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const events = [
    { date: "9 March - 24 April 2026", description: "• Registration" },
    { date: "25 April 2026", description: "• Domain Reveal & Preliminary Round Briefing" },
    { date: "25 April - 3 May 2026", description: "• Preliminary Round - Idea And Video Building" },
    { date: "1 - 3 May 2026", description: "• Preliminary Round - Submission" },
    { date: "4 - 8 May 2026", description: "• Preliminary Round - Judging" },
    { date: "9 May 2026", description: "• Finalists Announcement (20 Teams) <br /> • Final Round Briefing" },
    {
      date: "9 May - 6 June 2026",
      description: "• Final Round Prototype Building",
    },
    {
      date: "1 - 6 June 2026",
      description: "• Final Round Submission",
    },
    { date: "6 June 2026", description: "• Physical Final Day - Mentoring Session" },
    { date: "7 June 2026", description: "• Physical Final Day - Pitching Day" }
  ];

  return (
    <div className="bg-gradient-to-b from-[#1a1d23] via-[#0b0e14] to-[#0b0e14] p-4 md:p-10 text-center">
      {/* Divider: Changed from black to a Vivid Azure gradient glow */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#2dcefb] to-transparent mx-auto mb-8 md:mb-12 opacity-50"></div>
      
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xl md:text-4xl font-bold text-[#2dcefb] mb-6 md:mb-10"
      >
        Join Us On Our Journey
      </motion.h2>

      <div ref={timelineRef} className="relative">
        {/* Desktop Timeline */}
        {!isMobile && (
          <div className="relative">
            {/* Vertical Line */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute w-1 bg-gradient-to-b from-[#2dcefb] via-[#e151af] to-[#2dcefb] left-1/2 transform -translate-x-1/2 shadow-[0_0_15px_rgba(45, 206, 251, 0.3)] origin-top top-0 bottom-0 z-0"
            />

            {/* Top Circle */}
            <div className="flex justify-center mb-20 relative">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-5 h-5 bg-[#2dcefb] rounded-full shadow-[0_0_20px_#2dcefb] z-10"
              />
            </div>

            {/* Events */}
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grid grid-cols-3 items-center w-full mb-20"
              >
                {/* Left Text */}
                {index % 2 === 0 ? (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -50 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="text-right pr-8 col-span-1"
                  >
                    <h1 className="text-xl md:text-2xl font-black text-[#2dcefb] mb-2">
                      {event.date}
                    </h1>
                    <h6
                      className="text-xs md:text-sm font-bold text-[#fafdff]"
                      dangerouslySetInnerHTML={{ __html: event.description }}
                    ></h6>
                  </motion.div>
                ) : (
                  <div className="col-span-1"></div>
                )}

                {/* Center Section */}
                <div className="flex justify-center col-span-1 relative">
                  {/* Left connector line */}
                  {index % 2 === 0 && (
                    <motion.div
                      variants={{
                        hidden: { width: 0, opacity: 0 },
                        visible: { width: "50%", opacity: 1 },
                      }}
                      className="absolute top-1/2 left-0 h-[2px] bg-white shadow-[0_0_5px_#ffffff]"
                    />
                  )}

                  {/* The circle */}
                  <motion.div
                    variants={{
                      hidden: { scale: 0, opacity: 0 },
                      visible: { scale: 1, opacity: 1 },
                    }}
                    className="w-8 h-8 bg-white rounded-full shadow-[0_0_20px_#ffffff] z-10"
                  />

                  {/* Right connector line */}
                  {index % 2 !== 0 && (
                    <motion.div
                      variants={{
                        hidden: { width: 0, opacity: 0 },
                        visible: { width: "50%", opacity: 1 },
                      }}
                      className="absolute top-1/2 right-0 h-[2px] bg-white shadow-[0_0_5px_#ffffff]"
                    />
                  )}
                </div>

                {/* Right Text */}
                {index % 2 !== 0 ? (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: 50 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="text-left pl-8 col-span-1"
                  >
                    <h1 className="text-xl md:text-2xl font-black text-[#2dcefb] mb-2">
                      {event.date}
                    </h1>
                    <h6
                      className="text-xs md:text-sm font-bold text-[#fafdff]"
                      dangerouslySetInnerHTML={{ __html: event.description }}
                    ></h6>
                  </motion.div>
                ) : (
                  <div className="col-span-1"></div>
                )}
              </motion.div>
            ))}

            {/* Bottom Circle */}
            <div className="flex justify-center mt-20 relative">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-5 h-5 bg-[#2dcefb] rounded-full shadow-[0_0_20px_#2dcefb] z-10"
              />
            </div>
          </div>
        )}

        {/* Mobile Timeline */}
        {isMobile && (
          <div className="relative">
            {/* Container to center the timeline */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px]">
                {/* Vertical Line - Centered */}
                <motion.div
                  style={{ height: lineHeight }}
                  className="absolute w-1 bg-gradient-to-b from-[#2dcefb] via-[#e151af] to-[#2dcefb] left-1/2 transform -translate-x-1/2 shadow-[0_0_15px_rgba(45, 206, 251, 0.3)] origin-top top-0 bottom-0 z-0"
                />

                {/* Top Circle */}
                <div className="flex justify-center mb-16 relative">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-5 h-5 bg-[#2dcefb] rounded-full shadow-[0_0_20px_#2dcefb] z-10"
                  />
                </div>

                {/* Events */}
                {events.map((event, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex flex-col items-center mb-16 relative"
                  >
                    {/* Circle */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scale: 0 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      className="w-6 h-6 bg-white rounded-full shadow-[0_0_15px_#ffffff] z-10 mb-4"
                    />

                    {/* Text Content */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      className="text-center px-4"
                    >
                      <h1 className="text-xl md:text-2xl font-black text-[#2dcefb] mb-2">
                        {event.date}
                      </h1>
                      <h6
                        className="text-xs md:text-sm font-bold text-[#fafdff]"
                        dangerouslySetInnerHTML={{ __html: event.description }}
                      ></h6>
                    </motion.div>
                  </motion.div>
                ))}

                {/* Bottom Circle */}
                <div className="flex justify-center mt-16 relative">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-5 h-5 bg-[#2dcefb] rounded-full shadow-[0_0_20px_#2dcefb] z-10"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
