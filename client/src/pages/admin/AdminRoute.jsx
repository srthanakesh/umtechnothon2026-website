import React, { useEffect, useRef } from 'react';
  import { Navigate } from 'react-router-dom';
  import { useUser } from '../../context/UserProvider';

  const AdminRoute = ({ children }) => {
    const { user, loading } = useUser();
    const alertShown = useRef(false);

    useEffect(() => {
      // Only show the alert once when we know for sure the user isn't an admin
      if (!loading && (!user || user.role !== "admin") && !alertShown.current) {
        alert("You are not authorized to access this page.");
        alertShown.current = true;
      }
    }, [user, loading]);

    if (loading) {
      return <p className="text-center text-lg mt-8">Checking permissions...</p>;
    }

    if (!user || user.role !== "admin") {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  export default AdminRoute;