const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const authmiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const refreshToken = req.cookies.refreshToken;
    if (!token) {
      if (!refreshToken) {
        return res
          .status(401)
          .json({ message: "Session expired. Please login again." });
      }
      return handleRefreshToken(refreshToken, req, res, next);
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded?._id).select("-PASSWORD");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.user = user;
      return next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        if (!refreshToken) {
          return res.status(401).json({
            message: "Session expired. Please login again",
          });
        }
        return handleRefreshToken(refreshToken, req, res, next);
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          message: "Invalid Token",
        });
      }
      return res.status(403).json({ message: "Forbidden" });
    }
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
};

const handleRefreshToken = async (refreshToken, req, res, next) => {
  try {
    const decoded = await jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET,
    );
    console.log(true)
    const user = await User.findById(decoded._id).select("-PASSWORD");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newAccessToken = jwt.sign(
      {
        _id: user._id,
        firstName: user.FIRST_NAME,
        lastName: user.LAST_NAME,
        email: user.EMAIL,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2m" },
    );
    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 2 * 60 * 1000,
    });
    req.user = user;
    return next();
  } catch (error) {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    return res
      .status(401)
      .json({ message: "Session expired. Please login again" });
  }
};

module.exports = authmiddleware;
