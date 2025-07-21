const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model");
const User = require("../models/User.model");

// POST /api/add-post
router.post("/add-post", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || title.length < 3 || !content || !author) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Ensure author exists
    const user = await User.findById(author);
    if (!user) return res.status(404).json({ message: "Author not found" });

    const post = new Post({ title, content, author });
    await post.save();

    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    res.status(500).json({ message: "Error adding post", error: error.message });
  }
});

// GET /api/all-posts (with author populated)
router.get("/all-posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
});

module.exports = router;
