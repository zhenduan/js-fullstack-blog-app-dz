import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    if (!user.isVerified) {
      return res
        .status(403)
        .json({ error: "Please verify your email to access" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(498).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
