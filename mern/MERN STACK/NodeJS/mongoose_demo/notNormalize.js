const express = require("express");
const app = express();
const mongoose = require("mongoose");

async function connectionToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost/notNormalize");
    console.log("connected to database....");
  } catch (err) {
    console.log("not connected to database....");
  }
}
connectionToDatabase();

const courseSchema = new mongoose.Schema({
  name: String,

  author: {
    type: mongoose.Schema({
      name: String,
      website: String,
      language: String,
    }),
  },
  tags: [String],
  isPublished: Boolean,
  date: { type: Date, default: Date.now() },

  price: Number,
});

const Course = mongoose.model("course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "mongodb course",
    author: {
      name: "shubham",
      website: "www.mycodecamp.com",
      language: "marathi",
    },
    tages: null,
    price: 100,
    isPublished: false,
  });

  try {
    const res = await course.save();
    console.log(res);
    console.log("object saved..");
  } catch (err) {
    // const { errors } = err;

    // for (const field in errors) {
    //   console.log(field.message);
    // }
    console.log(err);
  }
}

// createCourse();

async function getCourses() {
  try {
    const courses = await Course.find({},{_id:0,author:1});

    console.log(courses);
  } catch (err) {
    console.log(err);
  }
}

getCourses();
