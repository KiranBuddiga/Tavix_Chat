const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const dbConnection = require("./utils/dbConnection");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 2777;
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

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
