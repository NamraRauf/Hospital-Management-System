const express = require('express');
const Patient = require('../models/Patient');
const router = express.Router();

// Get all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find().select('-password');
        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get patient by ID
router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).select('-password');
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update patient
router.put('/:id', async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).select('-password');
        res.json(patient);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete patient
router.delete('/:id', async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;