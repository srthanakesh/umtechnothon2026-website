import React from "react";

const ContactHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
        {title}
      </h1>
      <p className="mx-auto max-w-lg text-lg leading-relaxed text-gray-600">
        {subtitle}
      </p>
    </div>
  );
};

export default ContactHeader;
