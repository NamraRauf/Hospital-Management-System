import axios from "axios";

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = (process.env.REACT_APP_API_URL || "http://localhost:6000/api").replace(/\/$/, "");

const API = axios.create({ baseURL: API_BASE_URL });

// Register (default: patient) - kept for backward compatibility with existing UI
export const registerUser = (formData) => API.post("/patients/register", formData);

// Explicit register helpers
export const registerPatient = (formData) => API.post("/patients/register", formData);
export const registerDoctor = (formData) => API.post("/doctors/register", formData);

// Login
export const loginUser = ({ email, password, ..._rest }) =>
  API.post("/auth/login", { email, password });
