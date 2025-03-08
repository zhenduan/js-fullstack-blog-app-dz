import express from "express";

const router = express.Router();

// Get all todos
router.get("/", async (req, res) => {
  // let collection = await db.collection("blog");
  // let results = await collection.find({}).toArray();
  // res.send(results).status(200);
});

export default router;
