import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Details from "./Pages/Details/Details";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Header from "./Components/Headers/Headers"

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute isLoginPage={true}>
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute isLoginPage={false}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/details/:id"
            element={
              <PrivateRoute isLoginPage={false}>
                <Details />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
