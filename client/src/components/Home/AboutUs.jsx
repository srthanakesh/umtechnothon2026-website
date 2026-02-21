import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-[#d0d2f0] to-[#d0d2f0] py-5 md:py-8 px-3 md:px-30 text-center">
      <div className="w-full h-1 bg-black mx-auto mb-5 md:mb-8"></div>
      
      <h2 className="text-xl md:text-2xl font-bold text-black mb-3 md:mb-4">ABOUT US</h2>
      
      <div className="max-w-2xl mx-auto bg-white p-3 md:p-5 rounded-xl md:rounded-2xl border-2 md:border-4 border-[#6a6fa5] shadow-lg mb-5 md:mb-8">
        <p className="text-sm md:text-base leading-relaxed text-gray-800">
          Technothon is a unique competition that showcases the latest technology and innovations, inspired by Shark Tank and America's Got Talent. This flagship event empowers participants to pitch bold ideas and products to a panel of judges.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;