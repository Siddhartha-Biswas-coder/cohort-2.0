import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    contact: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["buyer", "seller"],
      default: "buyer",
    },
    googleId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
