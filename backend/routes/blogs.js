import express from "express";
import Blog from "../models/Blog.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Comment from "../models/Comment.js";

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

//delete a blog
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }
    if (blog.author.toString() !== req.userId) {
      res
        .status(403)
        .json({ error: "You are not authorised to delete this blog" });
      return;
    }
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

//update blog
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, featuredImageUrl } = req.body;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }
    if (blog.author.toString() !== req.userId) {
      res
        .status(403)
        .json({ error: "You are not authorised to update this blog" });
      return;
    }
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (featuredImageUrl) blog.featuredImageUrl = featuredImageUrl;
    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Failed to update blog" });
  }
});

//crete comment for blog
router.post("/:id/comments", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = new Comment({
      content,
      blog: id,
      author: req.userId,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
});

export default router;
