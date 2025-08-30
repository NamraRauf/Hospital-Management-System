const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");

// Register a new doctor
router.post("/register", doctorController.registerDoctor);

// Get all doctors
router.get("/", doctorController.getDoctors);

// Get single doctor by ID
router.get("/:id", doctorController.getDoctorById);

// Update doctor info
router.put("/:id", doctorController.updateDoctor);

// Delete doctor
router.delete("/:id", doctorController.deleteDoctor);

module.exports = router;
