// mongodb://localhost:27017
// const express = require("express");
import mongoose from "mongoose";
// const app = express();
// mongoose
//   .connect("mongodb://localhost/mongooseDB")
//   .then(() => {
//     console.log("database connected");
//   })
//   .catch((e) => {
//     console.log(`error connecting database ${e}`);
//   });
async function connectionToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost/mongooseDB");
    console.log("connected to database!");
  } catch (error) {
    console.log(error);
  }
}
connectionToDatabase();
// make schema for collection Object
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name should be atleast 3 characters long."],
    maxLength: 50,
  },
  author: String,
  tags: {
    type: [String],
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
    },
  },
  category: {
    type: String,
    enum: {
      values: ["web", "mobile", "network"],
      message: "{VALUE} is not supported.",
    },
  },
  isPublished: Boolean,
  date: { type: Date, default: Date.now() },
  price: {
    type: Number,
    min: 100,
    max: 3000,
    required: function () {
      return this.isPublished;
    },
  },
});
// create bluepring for the schema course
const Course = mongoose.model("course", courseSchema);
async function createCourse() {
  try {
    const course = new Course({
      name: "",
      author: "mongodb university",
      tags: ["nodejs", "backend"],
      category: "web",
      price: 233,
      isPublished: false,
    });
    const res = await course.save();
    console.log(res);
    console.log("data saved...");
  } catch (err) {
    console.log(err);
    const { errors } = err;
    for (let field in errors) {
      console.log(errors[field].message);
    }
  }
}
createCourse();
async function getCourse() {
  try {
    const course = await Course.find();
    console.log(course);
  } catch (e) {
    console.log(e + "courses could not be fetched");
  }
}
// getCourse();
