import { Navigate } from "react-router-dom";
const TOKEN_KEY = import.meta.env.VITE_TOKEN_STORAGE_KEY;

const PrivateRoute = ({ children, isLoginPage }) => {
  const token = localStorage.getItem(TOKEN_KEY);

  // If the user is logged in and tries to access the login page, redirect to the dashboard
  if (isLoginPage && token) {
    return <Navigate to="/dashboard" replace />;
  }

  // If the user is not logged in and tries to access a protected page, redirect to login
  if (!token && !isLoginPage) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
