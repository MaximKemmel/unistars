import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export const RequireAuth = ({ children }) => {
  const isAuth = useAuth();

  if (!isAuth) {
    return <Navigate to="/sign_in" />;
  }

  return children;
};
