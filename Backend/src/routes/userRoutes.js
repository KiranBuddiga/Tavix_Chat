const express = require("express");
const {
  insertUser,
  loginUser,
  getUserDetails,
} = require("../controllers/UserController");
const authmiddleware = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/register", insertUser);
router.get("/login", loginUser);
router.get("/userDetails",authmiddleware, getUserDetails);

module.exports = router;
