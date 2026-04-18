const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    USER_NAME: {
      type: String,
      trim: true,
      required: [true, "User Name is Required"],
      minlength: [4, "User Name must be at least 4 characters"],
      maxlength: [50, "User Name cannot exceed 50 characters"],
    },
    EMAIL: {
      type: String,
      required: [true, "Email Address is Required"],
      unique: true,
      lowercase: true,
      trim: true,
      maxLength: 50,
    },
    PASSWORD: {
      type: String,
      required: [true, "Password is Required"],
      trim: true,
      minLength: 8,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
