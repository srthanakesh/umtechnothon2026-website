import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useUser } from "../../../context/UserProvider";

const Header = ({ isMobile }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { user, logout } = useUser(); // Get user data and logout function from context

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setMenuOpen(false);
    }
  }, [isMobile]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle scroll navigation
  const scrollToSection = (sectionId) => {
    // Close mobile menu if open
    setMenuOpen(false);
    // Close dropdown if open
    setDropdownOpen(false);

    // Check if we're on the home page
    if (location.pathname !== "/") {
      // If not on home page, navigate to home and then scroll after a short delay
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // Delay to allow page transition
    } else {
      // If already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollToLeaderboard = (sectionId) => {
    // Close mobile menu if open
    setMenuOpen(false);
    // Close dropdown if open
    setDropdownOpen(false);

    // Check if we're on the home page
    if (location.pathname !== "/team") {
      // If not on home page, navigate to home and then scroll after a short delay
      navigate("/team");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // Delay to allow page transition
    } else {
      // If already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const defaultItems = [
    { label: "About Us", action: () => scrollToSection("about-us") },
    { label: "Timeline", action: () => scrollToSection("timeline") },
    { label: "Sponsors", action: () => scrollToSection("sponsors") },
    { label: "Contact Us", action: () => scrollToSection("contact-us") },
  ];

  const participantItems = [
    { label: "Tasks", path: "/tasks" },
    // { label: "Leaderboard", action: () => scrollToLeaderboard("leaderboard") },
    { label: "Profile", path: "/team" },
    // Only show "Register Team" if user doesn't have a team_id
    ...(user && !user.team_id ? [{ label: "Register Team", path: "/register-team" }] : [])
  ];

  const adminItems = [
    { label: "Add Tasks", path: "/admin/add-task" },
    { label: "Marking", path: "/admin/view-submission" },
    { label: "Leaderboard", path: "/leaderboard" },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Get all the applicable navigation items based on user role
  const getNavItems = () => {
    if (!user) {
      return defaultItems;
    } else if (user.role === "user") {
      return participantItems;
    } else if (user.role === "admin") {
      return adminItems;
    }
    return [];
  };

  // Render a navigation item (either a Link or a button)
  const renderNavItem = (item, index) => {
    if (item.path) {
      // Regular link to a route
      return (
        <Link
          key={index}
          to={item.path}
          className="rounded-lg font-medium text-[#f5f5f5] hover:text-[#b4fff9] cursor-pointer"
          onClick={() => setMenuOpen(false)}
        >
          {item.label}
        </Link>
      );
    } else {
      // Scroll action button
      return (
        <button
          key={index}
          onClick={item.action}
          className="rounded-lg font-medium text-[#f5f5f5] hover:text-[#b4fff9] text-left cursor-pointer"
        >
          {item.label}
        </button>
      );
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#4c5ab6] shadow">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-3"
      >
        <div className="flex lg:flex-1 items-center">
          <Link to="/" className="-m-1.5 p-1.5">
            <img
              alt="Technothon Logo"
              src="/logos/technothon-logo-transparent.png"
              className="h-8 md:h-12 w-auto"
            />
          </Link>
          <p
            className={`ml-2 ${
              isMobile ? "text-3xl" : "text-3xl"
            } text-[#f5f5f5]`}
            style={{ fontFamily: "Saira Extra Condensed" }}
          >
            {isMobile ? "UM TECHNOTHON '25" : "| UM TECHNOTHON 2025"}
          </p>
        </div>

        {/* Mobile menu button */}
        {isMobile ? (
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#f5f5f5] hover:bg-[#6373c9]"
            >
              <span className="sr-only">Open main menu</span>
              {!menuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        ) : (
          <div className="flex flex-1 justify-end items-center gap-x-12">
            {/* If user is logged in, show dropdown for Homepage */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="rounded-lg font-medium text-[#f5f5f5] hover:text-[#b4fff9] flex items-center"
                >
                  Homepage
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-[#5d6cc7] z-10">
                    <div className="py-1">
                      <Link
                        to="/"
                        className="block px-4 py-2 text-sm text-[#f5f5f5] hover:bg-[#6373c9] hover:text-[#b4fff9]"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Home
                      </Link>
                      {defaultItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={item.action}
                          className="block w-full text-left px-4 py-2 text-sm text-[#f5f5f5] hover:bg-[#6373c9] hover:text-[#b4fff9]"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // If user is not logged in, show the default items
              defaultItems.map((item, index) => renderNavItem(item, index))
            )}

            {/* Show role-specific nav items */}
            {user &&
              getNavItems().map((item, index) => renderNavItem(item, index))}

            {/* Login/Logout button */}
            {user ? (
              <button
                onClick={logout}
                className="font-semibold rounded-md py-2 px-6 border border-transparent text-center bg-[#9599d2] hover:bg-[#b7dcff] text-sm transition-all shadow-md hover:shadow-lg ml-2"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="font-semibold rounded-md py-2 px-6 border border-transparent text-center bg-[#9599d2] hover:bg-[#b7dcff] text-sm transition-all shadow-md hover:shadow-lg ml-2">
                  Login
                </button>
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Mobile menu, show/hide based on menu state */}
      {isMobile && menuOpen && (
        <div className="bg-[#5d6cc7] shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                {/* Homepage dropdown for mobile */}
                <div className="block w-full">
                  <button
                    onClick={toggleDropdown}
                    className="flex w-full justify-between items-center px-3 py-2 rounded-md text-base font-medium text-[#f5f5f5] hover:bg-[#6373c9] hover:text-[#b4fff9]"
                  >
                    Homepage
                    <svg
                      className={`ml-1 h-4 w-4 transition-transform ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="pl-4 py-1 bg-[#4c5ab6] rounded-md mt-1">
                      <Link
                        to="/"
                        className="block px-3 py-2 text-sm text-[#f5f5f5] hover:bg-[#6373c9] hover:text-[#b4fff9] rounded-md"
                        onClick={() => {
                          setDropdownOpen(false);
                          setMenuOpen(false);
                        }}
                      >
                        Home
                      </Link>
                      {defaultItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={item.action}
                          className="block w-full text-left px-3 py-2 text-sm text-[#f5f5f5] hover:bg-[#6373c9] hover:text-[#b4fff9] rounded-md"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Role-specific items */}
                {getNavItems().map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-[#f5f5f5] hover:bg-[#6373c9] hover:text-[#b4fff9]"
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            ) : (
              // Default menu items for non-logged in users
              defaultItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#f5f5f5] hover:bg-[#6373c9] hover:text-[#b4fff9]"
                >
                  {item.label}
                </button>
              ))
            )}

            {/* Login/Logout button */}
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="block w-full px-3 py-2 mt-1 rounded-md text-base font-medium text-center bg-[#9599d2] text-white hover:bg-[#b7dcff]"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 mt-1 rounded-md text-base font-medium text-center bg-[#9599d2] text-white hover:bg-[#b7dcff]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
