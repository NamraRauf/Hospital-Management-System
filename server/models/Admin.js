const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
  },
  permissions: [{
    type: String,
    enum: [
      "manage_users",
      "manage_appointments", 
      "view_reports",
      "manage_doctors",
      "manage_patients",
      "system_settings"
    ]
  }],
  department: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Admin", AdminSchema);