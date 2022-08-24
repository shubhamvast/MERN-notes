// import express form "express";
const express = require("express");
const app = express();
const mongoose = require("mongoose");

async function connectionToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost/mongooseDemo");
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

const Teacher = mongoose.model("people", courseSchema);

async function createCourse() {
  const teacher = new Teacher({
    name: "mongodb course",
    author: "mongodb university",
    tages: ["nodejs", "backend"],
    price: 1000,
    isPublished: true,
  });

  try {
    const res = await teacher.save();
    console.log(res);
    console.log("object saved..");
  } catch (err) {
    console.log(err);
  }
}

createCourse();
