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
router.get("/login", loginUser);
router.get("/userDetails", authmiddleware, getUserDetails);
router.get("/logout", logoutUser);

module.exports = router;
