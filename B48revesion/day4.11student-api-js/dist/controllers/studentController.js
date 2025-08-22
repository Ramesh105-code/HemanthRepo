"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentById = exports.getStudents = exports.createStudent = void 0;
const Student_1 = require("../models/Student");

const createStudent = async (req, res) => {
    try {
        const student = new Student_1.Student(req.body);
        await student.save();
        res.status(201).json({ message: "Student created successfully", student });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createStudent = createStudent;

const getStudents = async (req, res) => {
    try {
        const students = await Student_1.Student.find();
        res.json(students);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getStudents = getStudents;

const getStudentById = async (req, res) => {
    try {
        const student = await Student_1.Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(student);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getStudentById = getStudentById;
