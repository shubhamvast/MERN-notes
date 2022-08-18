const Joi = require("joi");

const express = require("express");

require("dotenv").config();

const app = express();

app.use(express.json());

const logging = require("./middlewares/logging");
const authontication = require("./middlewares/authontication");

app.use(logging.logger);
app.use(authontication.authontication);


app.use(express.static("../public"));// direct access to files //
app.use(express.urlencoded({extended : true}))//post object key and value in postman app


const morgan = require("morgan");
if (app.get("env") === "development") app.use(morgan("tiny")); // get logging for every request on console which you send

// console.log(process.env.NODE_ENV); // have to set explicitely
// console.log(app.get("env"));//by default return developement


const config = require("config");//some file must have name as per standard 


console.log(config.get("password"));
//config file is useful for getting information in different stages like production , developement 
//learn > npm i config  

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course1" },
  { id: 3, name: "course1" },
];

app.get("/", (req, res) => {
  res.send("hello 30000 ");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id/:empId", (req, res) => {
  console.log(req.params);
  res.send(req.params.id);
  console.log(req.query);
});

app.get("/api/courses/:id", (req, res) => {
  const course = findCourse(+req.params.id);

  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  validateCourse(req, res);

  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = findCourse(+req.params.id);

  validateCourse(req, res);

  var index = courses.indexOf(course);

  if (index !== -1) {
    courses[index] = { id: +req.params.id, name: req.body.name };
  }

  res.send(courses[index]);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = findCourse(+req.params.id);

  courses.splice(courses.indexOf(course), 1);

  res.status(200).send(course);
});

function findCourse(courseId) {
  const course = courses.find((c) => c.id === courseId);
  if (!course) res.status(404).send("course is not present...");
  return course;
}

function validateCourse(req, res) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("running on " + PORT);
});
