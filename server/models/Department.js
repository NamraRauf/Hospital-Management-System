const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  doctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  location: {
    building: String,
    floor: String,
    room: String,
  },
  contact: {
    phone: String,
    email: String,
    extension: String,
  },
  operatingHours: {
    monday: { start: String, end: String },
    tuesday: { start: String, end: String },
    wednesday: { start: String, end: String },
    thursday: { start: String, end: String },
    friday: { start: String, end: String },
    saturday: { start: String, end: String },
    sunday: { start: String, end: String },
  },
  services: [String],
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Department", DepartmentSchema);