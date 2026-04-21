const express = require("express");
const {
  insertUser,
  loginUser,
  getUserDetails,
  logoutUser,
} = require("../controllers/UserController");
const authmiddleware = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/register", insertUser);
router.post("/login", loginUser);
router.post("/userDetails", authmiddleware, getUserDetails);
router.post("/logout", logoutUser);

module.exports = router;
