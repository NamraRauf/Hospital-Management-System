const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createAppointment,
  getUserAppointments,
  updateAppointmentStatus,
  getDoctors,
} = require("../controllers/appointmentController");

// Get all doctors (for appointment booking)
router.get("/doctors", auth, getDoctors);

// Create new appointment
router.post("/", auth, createAppointment);

// Get user's appointments
router.get("/", auth, getUserAppointments);

// Update appointment status
router.put("/:appointmentId", auth, updateAppointmentStatus);

module.exports = router;