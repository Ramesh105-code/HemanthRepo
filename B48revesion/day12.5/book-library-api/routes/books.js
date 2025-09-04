const express = require("express");
const router = express.Router();
const Book = require("../models/Book");


router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const { author, available, page = 1, limit = 10 } = req.query;
    const query = {};
    if (author) query.author = author;
    if (available !== undefined) query.available = available === "true";

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalCount = await Book.countDocuments(query);

    res.json({ total: totalCount, page: Number(page), limit: Number(limit), books });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    book.available = !book.available;
    const updated = await book.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
