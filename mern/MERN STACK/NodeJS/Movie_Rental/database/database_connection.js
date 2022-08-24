
const config = require("config");

const mongoose = require("mongoose");

async function databaseConnection() {
  try {
    await mongoose.connect(config.get("url"));
    console.log("connected to database....");
  } catch (err) {
    console.log(err);
    console.log("not connected to database...");
  }
}

async function closeDatabaseConnection() {
  try {
    await mongoose.connection.close();
    console.log("connection closed...");
  } catch (err) {
    console.log("connection not closed....");
  }
}

module.exports = { databaseConnection, closeDatabaseConnection };
