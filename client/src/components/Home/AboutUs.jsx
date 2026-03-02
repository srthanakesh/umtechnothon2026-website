import React from 'react';

const AboutUs = () => {
  return (
    /* Changed background to Dark Grey Blue */
    <div className="bg-[#1a1d23] py-10 md:py-16 px-6 md:px-30 text-center">
      
      {/* Divider: Changed from black to a Vivid Azure gradient glow */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#2dcefb] to-transparent mx-auto mb-8 md:mb-12 opacity-50"></div>
      
      {/* Heading: Changed to Vivid Azure */}
      <h2 className="text-2xl md:text-4xl font-bold text-[#2dcefb] mb-6 md:mb-8 tracking-widest">
        ABOUT US
      </h2>
      
      {/* The Box: Changed to a dark "Glass" style with an Azure border */}
      <div className="max-w-3xl mx-auto bg-slate-900/50 backdrop-blur-md p-6 md:p-10 rounded-2xl border border-[#2dcefb]/30 shadow-[0_0_20px_rgba(45,206,251,0.1)] mb-10">
        {/* Text: Changed to Light Azure for readability on dark background */}
        <p className="text-base md:text-lg leading-relaxed text-[#fafdff] opacity-90">
          Technothon is a unique competition that showcases the latest technology and innovations, inspired by Shark Tank and America's Got Talent. This flagship event empowers participants to pitch bold ideas and products to a panel of judges.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;