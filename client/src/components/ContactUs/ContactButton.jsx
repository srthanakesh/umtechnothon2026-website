import React from "react";

const ContactButton = ({ icon: Icon, label, href, color, hoverColor }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-3 rounded-xl ${color} px-6 py-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${hoverColor}`}
    >
      <Icon
        size={24}
        className="transition-transform duration-300 group-hover:rotate-12"
      />
      <span className="text-lg font-medium">{label}</span>
    </a>
  );
};

export default ContactButton;
