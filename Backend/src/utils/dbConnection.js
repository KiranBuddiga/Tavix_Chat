const mongoose = require("mongoose");
const connectionString = process.env.DB_CONNECTION_STRING;

const dbConnection = mongoose.connect(connectionString);

module.exports = dbConnection;
