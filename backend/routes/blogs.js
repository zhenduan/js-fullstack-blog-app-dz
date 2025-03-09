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
    console.error("Error getting blogs:", error);
    res.status(500).json({ error: "Failed to get blogs" });
  }
});

// get a single blog by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error getting blog by id:", error);
    res.status(500).json({ error: "Failed to get blog" });
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
