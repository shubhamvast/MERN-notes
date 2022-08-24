const express = require("express");
const router = express.Router();
router.use(express.json());

//imported from models/genreModel.js
const {
  Genre,
  validateGenre,
  printMongooseValidationError,
} = require("../models/genreModel");

// CURD operation

//read whole collection
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find({});

    if (genres.length == 0) {
      res.status(404).send("genres not found");
      return;
    }

    res.status(200).send(genres);
  } catch (err) {
    console.log(err);
  }
});

//read specific item
router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
      res.status(404).send("genre with given id not found....");
      return;
    }
    res.status(200).send(genre);
  } catch (err) {
    res.status(400).send(err);
  }
});

//create
router.post("/", async (req, res) => {
  try {
    let { error } = validateGenre(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const genre = new Genre({
      name: req.body.name,
    });
    await genre.save();
    res.status(200).send(genre);
  } catch (err) {
    // console.log(err);
    const errmsg = printMongooseValidationError(err);
    if (errmsg) res.status(400).send(errmsg);
    else {
      console.log(err);
      res.status(400).send("internal error other than mongoose validation check console..");
    }

  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    let { error } = validateGenre(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      {
        $set: { name: req.body.name },
      },
      {
        new: true,
        runvalidators: true,
      }
    );
    if (!genre) res.status(404).send("genre with given id not found");
    res.status(200).send(genre);
  } catch (err) {
    // console.log(err);
    const errmsg = printMongooseValidationError(err);
    if (errmsg) res.status(400).send(errmsg);
    else {
      console.log(err);
      res.status(400).send("internal error other than mongoose validation check console..");
    }

  }
});
//delete specific item
router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
     await Genre.deleteOne({ _id: req.params.id });
     if (!genre) {
      res.status(404).send("Movie not found with specific to delete....");
      return;
    }
    res.status(200).send(genre);
  } catch (err) {
    res.status(400).send(err)
  }
});

module.exports = router;