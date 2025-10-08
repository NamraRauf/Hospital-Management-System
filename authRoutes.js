const express = require('express');
const bcrypt = require('bcryptjs');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const router = express.Router();

// ✅ Register Doctor (NO HASHING HERE)
router.post('/register/doctor', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const doctor = new Doctor({ name, email, password });  // <-- HASHING REMOVE KAR DIYA
        await doctor.save();
        res.status(201).json({ message: 'Doctor Registered Successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await Doctor.findOne({ email });
        let userType = 'Doctor';

        if (!user) {
            user = await Patient.findOne({ email });
            userType = 'Patient';
            if (!user) {
                return res.status(404).json({ message: 'User Not Found' });
            }
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }

        res.status(200).json({ message: 'Login Successful', userType });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
