import express from "express";
import Blog from "../models/Blog.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to get blogs" });
  }
});

// post a blog
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content, featuredImageUrl } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const newBlog = new Blog({
      title,
      content,
      featuredImageUrl: featuredImageUrl || "",
      author: req.userId,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: "Failed to create blog post" });
  }
});

export default router;
