const express = require("express");
const router = express.Router();
const Student = require("../models/Student.model");
const Course = require("../models/Course.model");

// POST /api/add-student
router.post("/add-student", async (req, res) => {
  try {
    const { name, email, enrolledCourses } = req.body;

    if (!name || name.length < 3 || !email) {
      return res.status(400).json({ message: "Invalid name or email" });
    }

    const student = new Student({ name, email, enrolledCourses });
    await student.save();

    res.status(201).json({ message: "Student added", student });
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error: error.message });
  }
});

// GET /api/student/:id
router.get("/student/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("enrolledCourses", "name description");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error: error.message });
  }
});

module.exports = router;
