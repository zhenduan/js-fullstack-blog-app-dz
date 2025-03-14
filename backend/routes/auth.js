import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import cryptoRandomString from "crypto-random-string";

const router = express.Router();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// user registration
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    // Create a verification token
    const verificationToken = cryptoRandomString({
      length: 30,
      type: "alphanumeric",
    });
    const verificationTokenExpires = Date.now() + 3600000; // 1 hour

    const user = new User({
      username,
      email,
      passwordHash,
      verificationToken,
      verificationTokenExpires,
    });
    await user.save();
    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_BASE_URL}/verify-email/${verificationToken}`;
    await transporter.sendMail({
      to: email,
      subject: "Verify Your Email",
      html: `Please click <a href="${verificationUrl}">here</a> to verify your email.`,
    });
    res.status(201).json({
      message:
        "User registered. Please check your email to verify your account.",
    });
  } catch (error) {
    console.log("An error occurred while registering the user:", error.message);
    res.status(500).json({ error: "Registration failed" });
  }
});

//verify email
router.get("/verify-email/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }, // Check if the token is still valid
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    // Mark the user as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ error: "Failed to verify email" });
  }
});

//resend verification email
router.post("/resend-verification-email", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: "Email already verified" });
    }

    // Generate a new verification token
    const verificationToken = cryptoRandomString({
      length: 30,
      type: "alphanumeric",
    });
    console.log("verificationToken", verificationToken);
    const verificationTokenExpires = Date.now() + 3600000; // 1 hour

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = verificationTokenExpires;
    await user.save();

    // Send verification email
    const verificationUrl = `${process.env.BACKEND_BASE_URL}/api/auth/verify-email/${verificationToken}`;
    await transporter.sendMail({
      to: email,
      subject: "Verify Your Email",
      html: `Please click <a href="${verificationUrl}">here</a> to verify your email.`,
    });

    res
      .status(200)
      .json({ message: "Verification email sent. Please check your email." });
  } catch (error) {
    console.error("Resend verification email error:", error);
    res.status(500).json({ error: "Failed to resend verification email" });
  }
});

//user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (!user.isVerified) {
      return res
        .status(403)
        .json({ error: "Please verify your email to access" });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
