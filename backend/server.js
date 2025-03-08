import "./loadEnvironment.js";
import express from "express";
import cors from "cors";
import blogs from "./routes/blogs.js";
const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

app.use("/blogs", blogs);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
