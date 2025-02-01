const express = require('express');
const Student = require('../models/Student');
const router = express.Router();

// POST: Register a new student
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, course, gender } = req.body;

    const newStudent = new Student({
      name,
      email,
      phone,
      course,
      gender,
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering student', error: err.message });
  }
});

// GET: Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students', error: err.message });
  }
});

module.exports = router;
