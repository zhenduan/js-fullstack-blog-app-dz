import mongoose from "mongoose";
const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },

    author: {
      // Define author as an object with nested properties
      name: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
