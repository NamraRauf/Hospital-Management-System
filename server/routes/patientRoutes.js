const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

// Register a new patient
router.post("/register", patientController.registerPatient);

// Get all patients
router.get("/", patientController.getPatients);

// Get single patient by ID
router.get("/:id", patientController.getPatientById);

// Update patient info
router.put("/:id", patientController.updatePatient);

// Delete patient
router.delete("/:id", patientController.deletePatient);

module.exports = router;
