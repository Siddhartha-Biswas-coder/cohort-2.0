const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "Post id is required for creating a like"],
    },
    user: {
      type: String,
      required: [true, "Username is required for creating a like"],
    },
  },
  {
    timestamps: true,
  },
);

likeSchema.index({ postId: 1, user: 1 }, { unique: true });

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;
