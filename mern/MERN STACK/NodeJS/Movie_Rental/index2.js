//To manage all get,put,post,delete method
const express = require("express");
const app = express();

//to make validatation
//to set schema structure
const Joi = require("joi");

//return middleware function
//so we can access json objects sent from postman
// reuest.body  we can access otherwise it shown undefine
app.use(express.json());

const database = require("./database/database_connection");
database.databaseConnection();

//import genre router
const genreRouter = require("./router/genre");
app.use("/api/genres/", genreRouter);

//import customer router
const customerRouter = require("./router/customer");
app.use("/api/customers/", customerRouter);

//TO set PORT enviornmental variable
//so we can set PORT dynamically
require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
