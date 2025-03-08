import "./loadEnvironment.js";
import express from "express";
import cors from "cors";
import blogs from "./routes/blogs.js";
import auth from "./routes/auth.js";
import connectDB from "./db/conn.js";

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// app.use("/blogs", blogs);
app.use("/auth", auth);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
