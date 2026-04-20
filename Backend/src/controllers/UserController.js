const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");

const insertUser = async (req, res) => {
  try {
    const { USER_NAME, EMAIL, PASSWORD } = req.body;
    if (!USER_NAME || !EMAIL || !PASSWORD) {
      return res.status(400).json({ message: "Required Fields are missing" });
    }
    const existingUser = await User.findOne({ EMAIL });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);
    const newUser = await new User({
      USER_NAME,
      EMAIL,
      PASSWORD: hashedPassword,
    });
    await newUser.save();
    await sendMail(EMAIL, USER_NAME);
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
        userName: existingUser?.USER_NAME,
        email: existingUser?.EMAIL,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2m",
      },
    );
    const refreshToken = jwt.sign(
      {
        _id: existingUser?._id,
      },
      process.env.REFRESH_JWT_SECRET,
      {
        expiresIn: "5m",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 2 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 5 * 60 * 1000,
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
    const user = req.user;
    return res.status(200).json({ message: "Success", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { insertUser, loginUser, getUserDetails, logoutUser };
