const express = require("express");
const router = express.Router();
router.use(express.json());


const { default: mongoose } = require("mongoose");

// const {schema} = mongoose;
const genreSchema = new mongoose.Schema({
  name: String,
});

const Genre = mongoose.model("genre", genreSchema);

// CURD operation

//create
router.post("/", async (req, res) => {
  validateName(req, res);
  const genre = new Genre({
    name: req.body.name,
  });
  try {
    await genre.save();
    res.status(200).send(genre);
  } catch (err) {
    res.status(400).send("genre not posted");
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    validateName(req, res);
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
      $set: { name: req.body.name },
    });
    res.status(200).send(genre);
  } catch (err) {
    res.status(400).send("genre not updated....");
  }
});

//read whole collection
router.get("/", async (req, res) => {
  // const courses = await Course.find({}).skip(2);
  try {
    const genres = await Genre.find({});

    if (!genres) res.status(404).send("genres are not there..");

    res.status(200).send(genres);
  } catch (err) {
    console.log("error in getting elemets...");
  }
});

//read specific item
router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) res.status(404).send("not found....");

    res.status(200).send(genre);
  } catch (err) {
    console.log("genre not fetched by id");
  }
});

//delete specific item
router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    await Genre.deleteOne({ _id: req.params.id });
    res.status(200).send(genre);
  } catch (err) {
    res.status(400).send("internal server error while deleting..");
    // res.status(400).send(err)
  }
});

// import npm joi module for validation
const Joi = require("joi");
function validateName(req, res) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });

  const { error } = schema.validate(req.body);
  //   console.log(error);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
}

module.exports = router;
