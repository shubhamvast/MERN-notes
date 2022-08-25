//To manage all get,put,post,delete method
const express = require("express");
const app = express();

//return middleware function
//so we can access json objects sent from postman
// reuest.body  we can access otherwise it shown undefine
app.use(express.json());

require("dotenv").config();

const database = require("./database/database_connection");
database.databaseConnection();

//import genre router
const genreRouter = require("./router/genre");
app.use("/api/genres/", genreRouter);

//import customer router
const customerRouter = require("./router/customer");
app.use("/api/customers/", customerRouter);

//import movie router
const movieRouter = require("./router/movie");
app.use("/api/movies/", movieRouter);

//import rental router
const rentalRouter = require("./router/rental");
app.use("/api/rentals/", rentalRouter);

//import user router
const userRouter = require("./router/user");
app.use("/api/users/", userRouter);

//TO set PORT enviornmental variable
//so we can set PORT dynamically
require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
