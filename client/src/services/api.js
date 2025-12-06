import axios from "axios";

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:6000/api";

const API = axios.create({ baseURL: API_BASE_URL });

// Register
export const registerUser = (formData) => API.post("/register", formData);

// Login
export const loginUser = (formData) => API.post("/login", formData);
