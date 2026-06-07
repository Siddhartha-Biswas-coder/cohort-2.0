import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "New Chat",
      trim: true,
    },
    // Track if user pinned the conversation to the top
    isPinned: {
      type: Boolean,
      default: false,
    },
    // Track if user generated a share link for this chat
    isShared: {
      type: Boolean,
      default: false,
    },
    // Unique sharing key for public views (sparse lets users leave it empty)
    shareToken: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  },
);

const chatModel = mongoose.model("Chat", chatSchema);

export default chatModel;
