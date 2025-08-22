"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = require("express");
const studentController_1 = require("../controllers/studentController");
const router = (0, express_1.Router)();
exports.studentRouter = router;

router.post("/", studentController_1.createStudent);
router.get("/", studentController_1.getStudents);
router.get("/:id", studentController_1.getStudentById);
