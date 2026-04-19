const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const authmiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token Not Provided" });
    }
    const token = authHeader;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const findUser = await User.findById(decoded?._id).select({ PASSWORD: 0 });
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = findUser;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
};
module.exports = authmiddleware;
