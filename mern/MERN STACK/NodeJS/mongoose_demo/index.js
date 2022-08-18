// import express form "express";
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const config = require("config");

const DATABASE_URL = config.url;

console.log(DATABASE_URL);

async function connectionToDatabase() {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("connected to database....");
  } catch (err) {
    console.log("not connected to database....");
  }
}
connectionToDatabase();

const courseSchema = new mongoose.Schema({
  name: String,
  auth: String,
  tags: [String],
  isPublished: Boolean,
  date: { type: Date, default: Date.now() },
  price: Number,
});

const Course = mongoose.model("course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "mongodb course",
    author: "mongodb university",
    tages: ["nodejs", "backend"],
    price: 1000,
    isPublished: true,
  });

  try {
    const res = await course.save();
    console.log(res);
    console.log("object saved..");
  } catch (err) {
    console.log(err);
  }
}

// createCourse();

async function getCourses() {
  try {
    // const courses = await Course.find({}).skip(2);
    // const courses = await Course.find({},{_id:0,name:1});
    // const courses = await Course.find({},{_id:0,name:1}).limit(5);
    // const courses = await Course.find({price:{$lt:500}});
    // const courses = await Course.find( {name: { $regex: /^[c]/ }});

    // const aggregate = await Course.aggregate([{},{}])

    console.log(courses);
  } catch (err) {
    console.log("courses not fetched..");
  }
}

// getCourses();

// async function updateCourse(id) {
//   try {
//     const course = await Course.findByIdAndUpdate(
//       id,
//       {
//         $set: { name: "sidesh" },
//       },
//       { new: true }
//     );
//     console.log(course);
//   } catch (err) {
//     console.log(err.message);
//   }
// }
// updateCourse("62fdcbc4a4e92d48ecf8da1e");

// async function updateCourse(id) {
//   try {
//     const course = await Course.updateOne(
//       { _id: id },
//       {
//         $set: { name: "sidesh" },
//       },
//       { new: true }
//     );
//     console.log(course);
//   } catch (err) {
//     console.log(err.message);
//   }
// }
// updateCourse("62fdcbc4a4e92d48ecf8da1e");
// async function updateCourse(name) {
//   try {
//     const course = await Course.updateOne(
//       { name: name },
//       {
//         $set: { name: "sidesh" },
//       },
//       { new: true }
//     );
//     console.log(course);
//   } catch (err) {
//     console.log(err.message);
//   }
// }
// updateCourse("c++ course");


async function updateCourse(id){
 try{
  let course = await Course.findById(id);

  if(!course) return;

  course.name = "Node js by shubham";

  await course.save();

  console.log(course);
 }
 catch(err){
  console.log(err.message);
 }

}
// updateCourse("62fdcbc4a4e92d48ecf8da1e");


async function deleteCourse(id){
try{
  const course = await Course.findByIdAndDelete(id);
  console.log(course);
}
catch(err){
  console.log(err.message);
}
}

deleteCourse("62fdcbc4a4e92d48ecf8da1e");


function closeDatabaseConnection() {
  mongoose.connection.close();
  console.log("connection closed.....");
}
