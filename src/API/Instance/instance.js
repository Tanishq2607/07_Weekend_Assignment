import axios from "axios";

const Instance = axios.create({
  baseURL: "https://67eb8199aa794fb3222a7975.mockapi.io",
});
Instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default Instance;
