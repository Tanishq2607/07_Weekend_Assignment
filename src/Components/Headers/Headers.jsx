import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  const isPublicRoute = location.pathname === "/";

  return (
    <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <h1
        className="text-xl font-bold cursor-pointer text-blue-600"
        onClick={() => navigate("/")}
      >
        Tanishq's Assignment
      </h1>
      {!isPublicRoute &&
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded"
        >
          Logout
        </button>
      }
    </header>
  );
};

export default Header;
