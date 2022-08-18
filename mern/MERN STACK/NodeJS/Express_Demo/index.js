// import express from "express";
const Joi = require("joi");

const express = require("express");
// const e = require("express");
require("dotenv").config();

const app = express();

app.use(express.json()); //return middleware function

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course1" },
  { id: 3, name: "course1" },
];

app.get("/", (req, res) => {
  res.send("hello 30000 ");
});

// app.get("/",) ===> http://localhost::3000

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id/:empId", (req, res) => {
  console.log(req.params);
  res.send(req.params.id);
  //http://localhost:3000/api/courses/1
  //http://localhost:3000/api/courses/1/101   ==>   // more than one id

  //  req.query ==>  //http://localhost:3000/api/courses/1?sortBy=name
  //   http://localhost:3000/api/courses/1?sortBy=name&details=pimpalgaon ==> //more than one properties

  console.log(req.query);
});

app.get("/api/courses/:id", (req, res) => {
  //   const course = courses.find((c) => c.id === +req.params.id);
  //   if (!course) res.status(404).send("data not found...");
  const course = findCourse(+req.params.id);

  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  //   const schema = Joi.object({
  //     name: Joi.string().min(3).max(30).required(),
  //   });

  //   const { error } = schema.validate(req.body);
  //   //   console.log(error);
  //   if (error) {
  //     return res.status(400).send(error.details[0].message);
  //   }
  validateCourse(req, res);

  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  // const course = courses.find((c) => c.id === +req.params.id);
  // if (!course) res.status(404).send("course is not present...");
  // // res.send(course);
  const course = findCourse(+req.params.id);

  //   const schema = Joi.object({
  //     name: Joi.string().min(3).max(30).required()
  //   });

  //   const { error } = schema.validate(req.body);
  //   //   console.log(error);
  //   if (error) {
  //     return res.status(400).send(error.details[0].message);
  //   }

  validateCourse(req, res);

  var index = courses.indexOf(course);

  if (index !== -1) {
    courses[index] = { id: +req.params.id, name: req.body.name };
  }

  res.send(courses[index]);
});

app.delete("/api/courses/:id", (req, res) => {
  // const course = courses.find((c) => c.id === +req.params.id);
  // if (!course) res.status(404).send("course is not present...");
  // // res.send(course);

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
  //   console.log(error);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
}

const PORT = process.env.PORT || 3000;
//prot shoudon't  hard coded
app.listen(PORT, () => {
  console.log("running on " + PORT);
});

// validation purpose    >> npm i joi
