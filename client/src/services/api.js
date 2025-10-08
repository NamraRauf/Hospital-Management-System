import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:6000/api" });

// Register
export const registerUser = (formData) => API.post("/register", formData);

// Login
export const loginUser = (formData) => API.post("/login", formData);
