const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");

const insertUser = async (req, res) => {
  try {
    const { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD } = req.body;
    if (!FIRST_NAME || !LAST_NAME || !EMAIL || !PASSWORD) {
      return res.status(400).json({ message: "Required Fields are missing" });
    }
    const existingUser = await User.findOne({ EMAIL });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);
    const newUser = await new User({
      FIRST_NAME,
      LAST_NAME,
      EMAIL,
      PASSWORD: hashedPassword,
    });
    await newUser.save();
    await sendMail(EMAIL, FIRST_NAME);
    return res
      .status(201)
      .json({ message: "User Created Successfull", newUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: "ValidationError",
        error: messages,
      });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { EMAIL, PASSWORD } = req.body;
    if (!EMAIL || !PASSWORD) {
      return res
        .status(400)
        .json({ message: "Email and Password are missing" });
    }
    const existingUser = await User.findOne({ EMAIL });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentails" });
    }
    const checkPassword = await bcrypt.compare(
      PASSWORD,
      existingUser?.PASSWORD,
    );
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid Credentails" });
    }
    const token = jwt.sign(
      {
        _id: existingUser?._id,
        firstName: existingUser?.FIRST_NAME,
        lastName: existingUser?.LAST_NAME,
        email: existingUser?.EMAIL,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
    );
    const refreshToken = jwt.sign(
      {
        _id: existingUser?._id,
      },
      process.env.REFRESH_JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res
      .status(200)
      .json({ message: "User Login Successfull", data: existingUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.user?._id;
    const user = await User.findById(userId);
    return res.status(200).json({ message: "Success", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { insertUser, loginUser, getUserDetails, logoutUser };
