import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const API = axios.create({ baseURL: API_BASE_URL });

// Add auth token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);

// Appointment endpoints
export const getDoctors = () => API.get('/appointments/doctors');
export const createAppointment = (appointmentData) => API.post('/appointments', appointmentData);
export const getUserAppointments = () => API.get('/appointments');
export const updateAppointmentStatus = (appointmentId, updateData) => 
  API.put(`/appointments/${appointmentId}`, updateData);
