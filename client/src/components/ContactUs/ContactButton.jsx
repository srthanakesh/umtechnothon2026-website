import React from "react";

const ContactButton = ({ icon: Icon, label, href, color, hoverColor }) => {
  const commonClasses = `group flex items-center gap-3 rounded-xl ${color} px-6 py-4 text-white shadow-lg transition-all duration-300 ${
    href && href !== "#" ? `hover:scale-105 hover:shadow-xl ${hoverColor} cursor-pointer` : "opacity-80 cursor-default"
  }`;

  const InnerContent = (
    <>
      <Icon
        size={24}
        className={`transition-transform duration-300 ${href && href !== "#" ? "group-hover:rotate-12" : ""}`}
      />
      <span className="text-lg font-medium">{label}</span>
    </>
  );

  if (!href || href === "#") {
    return <div className={commonClasses}>{InnerContent}</div>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={commonClasses}
    >
      {InnerContent}
    </a>
  );
};

export default ContactButton;
