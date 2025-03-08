import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },

  author: {
    type: String,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Comment", CommentSchema);
