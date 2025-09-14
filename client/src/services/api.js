import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// Auth endpoints
export const registerDoctor = (formData) => API.post("/auth/register/doctor", formData);
export const registerPatient = (formData) => API.post("/auth/register/patient", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);
export const getCurrentUser = () => API.get("/auth/me");

// Doctor endpoints
export const getDoctors = () => API.get("/doctors");
export const getDoctor = (id) => API.get(`/doctors/${id}`);
export const updateDoctor = (id, data) => API.put(`/doctors/${id}`, data);
export const deleteDoctor = (id) => API.delete(`/doctors/${id}`);

// Patient endpoints
export const getPatients = () => API.get("/patients");
export const getPatient = (id) => API.get(`/patients/${id}`);
export const updatePatient = (id, data) => API.put(`/patients/${id}`, data);
export const deletePatient = (id) => API.delete(`/patients/${id}`);

// Appointment endpoints
export const getAppointments = () => API.get("/appointments");
export const createAppointment = (data) => API.post("/appointments", data);
export const getAppointment = (id) => API.get(`/appointments/${id}`);
export const updateAppointment = (id, data) => API.put(`/appointments/${id}`, data);
export const deleteAppointment = (id) => API.delete(`/appointments/${id}`);
