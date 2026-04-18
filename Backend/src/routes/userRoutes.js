const express = require("express");
const { insertUser } = require("../controllers/UserController");
const router = express.Router();

router.post("/register", insertUser);

module.exports = router;
