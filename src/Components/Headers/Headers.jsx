import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const TOKEN_KEY = import.meta.env.VITE_TOKEN_STORAGE_KEY;
  const USERNAME_KEY = import.meta.env.VITE_USERNAME_STORAGE_KEY;

  useEffect(() => {
    const storedUser = localStorage.getItem(USERNAME_KEY);
    if (storedUser) {
      setUsername(storedUser);
    }
  }, [USERNAME_KEY]);

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    navigate("/");
  };

  const isPublicRoute = location.pathname === "/";

  return (
    <>
    <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-10 border-b border-gray-100">
      <h1
        className="text-xl font-bold cursor-pointer text-green-700 hover:text-green-800 transition duration-200"
        onClick={() => navigate("/")}
      >
        Tanishq's Assignment
      </h1>

      <div className="flex items-center gap-4">
        {!isPublicRoute && username && (
          <span className="text-gray-600 hidden sm:inline-block">
            Welcome, <span className="font-medium text-gray-800">{username}</span>
          </span>
        )}

        {!isPublicRoute && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white px-4 py-1.5 rounded-md transition duration-200 font-medium"
          >
            Logout
          </button>
        )}
      </div>
     
    </header>
    <Outlet />
    </>
  );
};

export default Header;