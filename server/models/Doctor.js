const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: { type: String, default: 'General Medicine' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    experience: { type: Number, default: 0 },
    qualifications: { type: String, default: '' },
    consultationFee: { type: Number, default: 0 },
    availability: { 
        monday: { type: Boolean, default: true },
        tuesday: { type: Boolean, default: true },
        wednesday: { type: Boolean, default: true },
        thursday: { type: Boolean, default: true },
        friday: { type: Boolean, default: true },
        saturday: { type: Boolean, default: false },
        sunday: { type: Boolean, default: false }
    },
    workingHours: {
        start: { type: String, default: '09:00' },
        end: { type: String, default: '17:00' }
    }
}, {
    timestamps: true
});

doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
