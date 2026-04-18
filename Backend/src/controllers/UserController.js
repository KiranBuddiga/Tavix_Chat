const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/sendMail");

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

module.exports = { insertUser };
