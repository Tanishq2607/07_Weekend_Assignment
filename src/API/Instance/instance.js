import axios from "axios";
import { ERROR_REQUEST_INTERCEPTOR, ERROR_REQUEST_SETUP, BEARER_PREFIX } from "../../Constants/constant"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LOGIN_API_URL = import.meta.env.VITE_LOGIN_API_URL;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_STORAGE_KEY;

// Create mockAPI instance
const Instance = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to all mockAPI requests
Instance.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `${BEARER_PREFIX}${token}`;
      }
      return config;
    } catch (error) {
      console.error(ERROR_REQUEST_INTERCEPTOR, error);
      return config;
    }
  },
  (error) => {
    console.error(ERROR_REQUEST_SETUP, error);
    return Promise.reject(error);
  }
);

// Auth API functions (using regular axios, not the Instance)
export const loginUser = async ({ username, password }) => {
  try {
    const response = await axios.post(
      LOGIN_API_URL,
      { username, password }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default Instance;