import express from "express";
import Blog from "../models/Blog.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Comment from "../models/Comment.js";
import { upload, cloudinary } from "../config/cloudinary.js";

const router = express.Router();

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 2, search = "", sort = "-createdAt" } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const blogs = await Blog.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("author", "username");

    const totalBlogs = await Blog.countDocuments(query);
    res.status(200).json({
      blogs,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      page: parseInt(page),
      limit: parseInt(limit),
    });
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
router.post(
  "/",
  authMiddleware,
  upload.single("featuredImage"),
  async (req, res) => {
    try {
      const { title, content } = req.body;

      if (!title || !content) {
        return res
          .status(400)
          .json({ error: "Title and content are required" });
      }

      // Get the Cloudinary URL if a file was uploaded
      const featuredImageUrl = req.file ? req.file.path : "";

      const newBlog = new Blog({
        title,
        content,
        featuredImageUrl: featuredImageUrl,
        author: req.user.userId,
      });

      const savedBlog = await newBlog.save();
      res.status(201).json(savedBlog);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ error: "Failed to create blog post" });
    }
  }
);

//delete a blog
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }
    if (blog.author.toString() !== req.user.userId) {
      res
        .status(403)
        .json({ error: "You are not authorised to delete this blog" });
      return;
    }

    await Blog.deleteOne({ _id: id });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

//update blog
router.put(
  "/:id",
  authMiddleware,
  upload.single("featuredImage"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, featuredImageUrl } = req.body;
      const blog = await Blog.findById(id);
      if (!blog) {
        res.status(404).json({ error: "Blog not found" });
        return;
      }
      if (blog.author.toString() !== req.user.userId) {
        res
          .status(403)
          .json({ error: "You are not authorised to update this blog" });
        return;
      }
      if (title) blog.title = title;
      if (content) blog.content = content;
      // If a new file is uploaded, update the featuredImageUrl
      if (req.file) {
        // Delete the old image from Cloudinary
        if (blog.featuredImageUrl) {
          const publicId = blog.featuredImageUrl.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`blog_covers/${publicId}`);
        }

        // Set the new featuredImageUrl
        blog.featuredImageUrl = req.file.path;
      }
      const updatedBlog = await blog.save();
      res.status(200).json(updatedBlog);
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({ error: "Failed to update blog" });
    }
  }
);

//crete comment for blog
router.post("/:id/comments", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = new Comment({
      content,
      blog: id,
      author: { username: req.user.username, id: req.user.userId },
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
});

//get comments for blog
router.get("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ blog: id }).populate("author");
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error getting comments:", error);
    res.status(500).json({ error: "Failed to get comments" });
  }
});

//delete comment
router.delete("/comments/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }
    if (comment.author.id !== req.user.userId) {
      res
        .status(403)
        .json({ error: "You are not authorised to delete this comment" });
      return;
    }
    await Comment.deleteOne({ _id: id });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

//update comment
router.put("/comments/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const comment = await Comment.findById(id);
    if (!comment) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }
    if (comment.author.id !== req.user.userId) {
      res
        .status(403)
        .json({ error: "You are not authorised to update this comment" });
      return;
    }
    if (content) comment.content = content;
    const updatedComment = await comment.save();
    res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Failed to update comment" });
  }
});

export default router;
