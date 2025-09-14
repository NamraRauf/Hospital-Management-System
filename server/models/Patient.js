const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    phone: { type: String },
    address: { type: String },
    medicalHistory: { type: String },
    patientId: { type: String, unique: true },
    bloodType: { type: String },
    emergencyContact: { type: String },
    insuranceInfo: { type: String }
}, {
    timestamps: true
});

patientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    // Generate unique patient ID
    if (!this.patientId) {
        const count = await mongoose.model('Patient').countDocuments();
        this.patientId = `P${String(count + 1).padStart(4, '0')}`;
    }
    next();
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
