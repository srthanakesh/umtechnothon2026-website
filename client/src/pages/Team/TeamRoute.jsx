// TeamRoute.jsx
import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserProvider';

const TeamRoute = ({ children }) => {
  const { user, loading } = useUser();
  const alertShown = useRef(false);

  useEffect(() => {
    // Only show the alert once when we know the user isn't authorized
    if (!loading && (!user || user.role !== "user") && !alertShown.current) {
      alert("You need to be logged in as a user to access this page.");
      alertShown.current = true;
    }
  }, [user, loading]);

  if (loading) {
    return <p className="text-center text-lg mt-8">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "user") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default TeamRoute;