import { useState, useEffect } from "react";

import Header from "../../components/Shared/UI/Header";
import Footer from "../../components/Shared/UI/Footer";

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile and update state
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header isMobile={isMobile} />
      <main className="flex-1 pt-16">{children}</main>
      <Footer isMobile={isMobile} />
    </div>
  );
};
export default Layout;
