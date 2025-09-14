const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const router = express.Router();

// ✅ Register Doctor
router.post('/register/doctor', async (req, res) => {
    const { name, email, password, specialization, phone, address } = req.body;
    
    try {
        // Check if doctor already exists
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor with this email already exists' });
        }

        const doctor = new Doctor({ 
            name, 
            email, 
            password, 
            specialization: specialization || 'General Medicine',
            phone: phone || '',
            address: address || ''
        });
        
        await doctor.save();
        
        // Generate JWT token
        const payload = {
            user: {
                id: doctor._id,
                role: 'doctor',
                name: doctor.name,
                email: doctor.email
            }
        };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
        
        res.status(201).json({ 
            message: 'Doctor Registered Successfully',
            token,
            user: {
                id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                role: 'doctor',
                specialization: doctor.specialization
            }
        });
    } catch (err) {
        console.error(err.message);
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
});

// ✅ Register Patient
router.post('/register/patient', async (req, res) => {
    const { 
        name, 
        email, 
        password, 
        age, 
        phone, 
        address, 
        medicalHistory, 
        bloodType, 
        emergencyContact, 
        insuranceInfo 
    } = req.body;
    
    try {
        // Check if patient already exists
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({ message: 'Patient with this email already exists' });
        }

        const patient = new Patient({ 
            name, 
            email, 
            password, 
            age, 
            phone, 
            address, 
            medicalHistory,
            bloodType,
            emergencyContact,
            insuranceInfo
        });
        
        await patient.save();
        
        // Generate JWT token
        const payload = {
            user: {
                id: patient._id,
                role: 'patient',
                name: patient.name,
                email: patient.email,
                patientId: patient.patientId
            }
        };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
        
        res.status(201).json({ 
            message: 'Patient Registered Successfully',
            token,
            user: {
                id: patient._id,
                name: patient.name,
                email: patient.email,
                role: 'patient',
                patientId: patient.patientId
            }
        });
    } catch (err) {
        console.error(err.message);
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await Doctor.findOne({ email });
        let userType = 'doctor';

        if (!user) {
            user = await Patient.findOne({ email });
            userType = 'patient';
            if (!user) {
                return res.status(404).json({ message: 'User Not Found' });
            }
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        // Generate JWT token
        const payload = {
            user: {
                id: user._id,
                role: userType,
                name: user.name,
                email: user.email
            }
        };

        if (userType === 'patient') {
            payload.user.patientId = user.patientId;
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({ 
            message: 'Login Successful', 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: userType,
                ...(userType === 'patient' && { patientId: user.patientId }),
                ...(userType === 'doctor' && { specialization: user.specialization })
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// ✅ Verify Token Middleware
const verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// ✅ Get Current User
router.get('/me', verifyToken, async (req, res) => {
    try {
        res.json({ user: req.user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = { router, verifyToken };
