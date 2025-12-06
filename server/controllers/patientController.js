const Patient = require("../models/Patient");

// Register a new patient
exports.registerPatient = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const patient = new Patient({ name, email, password });
    await patient.save();
    res.status(201).json({ message: "Patient registered successfully", patient });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Error registering patient", error: error.message });
  }
};

// Get all patients
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().select("-password");
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error: error.message });
  }
};

// Get single patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).select("-password");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error: error.message });
  }
};

// Update patient info
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error updating patient", error: error.message });
  }
};

// Delete patient
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting patient", error: error.message });
  }
};

// ✅ Patient Profile dikhana (kept for backward compatibility)
exports.getPatientProfile = exports.getPatientById;

// ✅ Patient Profile update karna (kept for backward compatibility)
exports.updatePatientProfile = exports.updatePatient;
