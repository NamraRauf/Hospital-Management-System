const mongoose = require("mongoose");

const MedicalRecordSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  },
  diagnosis: {
    type: String,
    required: true,
  },
  symptoms: {
    type: [String],
    default: [],
  },
  treatment: {
    type: String,
    required: true,
  },
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    duration: String,
  }],
  vitalSigns: {
    bloodPressure: String,
    heartRate: String,
    temperature: String,
    weight: String,
    height: String,
  },
  notes: {
    type: String,
    default: "",
  },
  followUpDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("MedicalRecord", MedicalRecordSchema);