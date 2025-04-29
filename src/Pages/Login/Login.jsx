import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import InputField from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { LOGIN_ERROR_MESSAGE } from "../../Constants/constant";
import { loginUser } from "../../API/Instance/instance";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const TOKEN_KEY = import.meta.env.VITE_TOKEN_STORAGE_KEY;
  const USERNAME_KEY = import.meta.env.VITE_USERNAME_STORAGE_KEY;

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem(TOKEN_KEY, data.accessToken);
      localStorage.setItem(USERNAME_KEY, data.username);
      navigate("/dashboard");
    },
    onError: () => {
      setError(LOGIN_ERROR_MESSAGE);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    mutation.mutate({ username, password });
  };

  const isFormValid = username.length > 0 && password.length > 0;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-md text-red-700 mb-4 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="username">
              Username
            </label>
            <InputField
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="password">
              Password
            </label>
            <InputField
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isFormValid}
          >
            {mutation.isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;