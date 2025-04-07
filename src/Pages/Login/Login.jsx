import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";

const loginUser = async ({ username, password }) => {
  const response = await axios.post("https://dummyjson.com/auth/login", {
    username,
    password,
  });
  return response.data; 
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("username", data.username); 
      navigate("/dashboard");
    },
    onError: () => {
      setError("Invalid credentials");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    mutation.mutate({ username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white border rounded-lg p-6 w-80 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
          <InputField
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
          <InputField
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">
            {mutation.isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
