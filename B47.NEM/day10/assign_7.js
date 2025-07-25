const express = require("express");
const Note = require("../models/note.model");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content, createdBy: req.user.userId });
    await note.save();
    res.status(201).json(note);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ createdBy: req.user.userId });
    if (notes.length === 0) return res.status(404).json({ message: "No data found" });
    res.status(200).json(notes);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "No data found" });
    res.status(200).json(note);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, createdBy: req.user.userId });
    if (!note) return res.status(404).json({ message: "No data found" });
    res.status(200).json({ message: "Note deleted" });
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
