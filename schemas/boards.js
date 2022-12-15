const mongoose = require("mongoose");

const boardsSchema = new mongoose.Schema(
  {
    postId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { collection: "posts", timestamps: true }
);

module.exports = mongoose.model("posts", postsSchema);
