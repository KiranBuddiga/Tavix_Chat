const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const authmiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Token Not Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded?._id).select("-PASSWORD");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
};
module.exports = authmiddleware;
