const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 2777;

app.listen(() => {
  console.log(`Server started successfull at port ${PORT}`);
});
