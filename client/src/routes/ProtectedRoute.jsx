import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";

const ProtectedRoute = ({ roles, children }) => {
  const { user, isLoading, logout } = useUser();

  // Wait for user to load before making a decision
  if (isLoading) {
    return <div>Loading...</div>; // or a spinner component
  }

  // If user is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role is defined and doesn't match user's role
  if (roles && !roles.includes(user.role)) {
    logout(); // 👈 call logout from context
    return <Navigate to="/login" replace />;
  }

  // Access granted
  return children;
};

export default ProtectedRoute;
