import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  // Destructuring user properties from the Redux store
  const { anchorConnected, waxConnected } = useSelector((state) => state.user);

  // Redirect to the home page if neither Wax nor Anchor is connected
  if (!waxConnected && !anchorConnected) {
    return <Navigate to="/" replace />;
  }

  // Render the protected component if connected
  return <Component />;
};

export default ProtectedRoute;
