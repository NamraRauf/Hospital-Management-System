const Appointment = require("../models/Appointment");
const User = require("../models/User");

// Create new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;
    const patientId = req.user.id;

    // Check if doctor exists and is actually a doctor
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(400).json({ error: "Invalid doctor selected" });
    }

    // Check if appointment slot is available
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date: new Date(date),
      time,
      status: { $ne: "cancelled" }
    });

    if (existingAppointment) {
      return res.status(400).json({ error: "This time slot is already booked" });
    }

    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      date: new Date(date),
      time,
      reason,
    });

    await appointment.save();
    await appointment.populate([
      { path: "patient", select: "name email" },
      { path: "doctor", select: "name email" }
    ]);

    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get user's appointments
exports.getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let query = {};
    if (userRole === "patient") {
      query.patient = userId;
    } else if (userRole === "doctor") {
      query.doctor = userId;
    }

    const appointments = await Appointment.find(query)
      .populate("patient", "name email")
      .populate("doctor", "name email")
      .sort({ date: 1, time: 1 });

    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status, notes } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Check if user has permission to update this appointment
    const userId = req.user.id;
    const userRole = req.user.role;

    if (userRole === "patient" && appointment.patient.toString() !== userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    if (userRole === "doctor" && appointment.doctor.toString() !== userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    appointment.status = status;
    if (notes) appointment.notes = notes;

    await appointment.save();
    await appointment.populate([
      { path: "patient", select: "name email" },
      { path: "doctor", select: "name email" }
    ]);

    res.json({ message: "Appointment updated successfully", appointment });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all doctors for appointment booking
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("name email");
    res.json(doctors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};