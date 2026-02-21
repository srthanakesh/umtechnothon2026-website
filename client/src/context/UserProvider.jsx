import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getCurrentUser } from "../services/AuthServices";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        const userData = await getCurrentUser();
        setUser(userData);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    checkUser();

    // Listen for token change events (login/logout)
    const handleAuthChange = () => {
      checkUser();
    };

    window.addEventListener("authChanged", handleAuthChange);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUser(null);
    window.dispatchEvent(new Event("authChanged")); // also notify logout
  };

  return (
    <UserContext.Provider value={{ user, isLoading, logout: handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }
  return context;
};

export default UserProvider;
