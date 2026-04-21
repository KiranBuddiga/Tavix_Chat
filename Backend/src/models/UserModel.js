const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    FIRST_NAME: {
      type: String,
      trim: true,
      required: [true, "First Name is Required"],
      minlength: [4, "First Name must be at least 4 characters"],
      maxlength: [50, "First Name cannot exceed 50 characters"],
    },
    LAST_NAME: {
      type: String,
      trim: true,
      required: [true, "Last Name is Required"],
      minlength: [4, "Last Name must be at least 4 characters"],
      maxlength: [50, "Last Name cannot exceed 50 characters"],
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
    IMAGE: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/026/630/551/small/profile-icon-symbol-design-illustration-vector.jpg",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
