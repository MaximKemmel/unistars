import { useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";

import { useActions } from "../hooks/useActions";
import { useAuth } from "../hooks/useAuth";

export const RequireAuth = ({ children }) => {
  const { authMe } = useActions();
  const isAuth = useAuth();

  useLayoutEffect(() => {
    authMe();
  }, []);

  if (!isAuth) {
    return <Navigate to="/sign_in" />;
  }

  return children;
};
