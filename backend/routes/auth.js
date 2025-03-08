import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// user registration
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, passwordHash });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("An error occurred while registering the user:", error.message);
    res.status(500).json({ error: "Registration failed" });
  }
});

export default router;
