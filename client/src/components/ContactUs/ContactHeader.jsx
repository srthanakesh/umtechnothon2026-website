import React from "react";

const ContactHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-cyan-400 md:text-4xl uppercase">
        {title}
      </h1>
      <p className="mx-auto max-w-lg text-lg leading-relaxed text-gray-400">
        {subtitle}
      </p>
    </div>
  );
};

export default ContactHeader;
