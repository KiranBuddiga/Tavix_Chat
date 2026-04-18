const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const dbConnection = require("./utils/dbConnection");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 2777;
app.use(express.json())

dbConnection
  .then(() => {
    console.log("Database connected Successfull");
    app.listen(PORT, () => {
      console.log(`Server started successfull at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });

app.use("/auth", userRoutes);
