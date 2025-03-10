import mongoose from "mongoose";
import Comment from "./Comment.js";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    featuredImageUrl: {
      type: String,
      default: "",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

BlogSchema.pre("deleteOne", async function (next) {
  const blogId = this.getQuery()._id; // `this` refers to the query object, not the document

  try {
    // Delete all comments with the matching blogId
    await Comment.deleteMany({ blog: blogId });
    next();
  } catch (error) {
    console.error("Error deleting comments:", error);
    next(error);
  }
});

BlogSchema.plugin(mongoosePaginate);

export default mongoose.model("Blog", BlogSchema);
