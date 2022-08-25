const express = require("express");
const app = express();
const mongoose = require("mongoose");

async function connectionToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost/hybrid");
    console.log("connected to database....");
  } catch (err) {
    console.log("not connected to database....");
  }
}
connectionToDatabase();

const authorSchema = new mongoose.Schema({
  name: String,
  language: String,
  website: String,
});

const Author = mongoose.model("author", authorSchema);

const courseSchema = new mongoose.Schema({
  name: String,

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
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
      _id: "63070add3018a0a66e0d217a",
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

createCourse();

async function getCourses() {
  try {
    const courses = await Course.find({}).populate("author", {
      name: 1,
      _id: 0,
    });

    console.log(courses);
  } catch (err) {
    console.log("courses not fetched..");
  }
}

// getCourses();

async function createAuthor() {
  const author = new Author({
    name: "shubham",
    language: "marathi",
    website: "www.Mudik.com",
  });

  try {
    const res = await author.save();
    console.log(res);
    console.log("object saved..");
  } catch (err) {
    console.log(err);
  }
}
// createAuthor();
