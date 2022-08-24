const express = require("express");
const router = express.Router();
router.use(express.json());

const {
  Movie,
  validateMovie,
  printMongooseValidationError,
} = require("../models/movieModel");

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find({});
    if (!movies) return res.status(400).send("movies not in database...");
    res.status(200).send(movies);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(400).send("movie not in database with specific id...");
    res.status(200).send(movie);
  } catch (err) {
    res.status(400).send(err);
  }
});

const { Genre } = require("../models/genreModel");
router.post("/", async (req, res) => {
  try {
    let { error } = validateMovie(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send("genre with specific id not found");

    const movie = new Movie({
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      dailyRentalRate: req.body.dailyRentalRate,
      numberInStock: req.body.numberInStock,
      liked: req.body.liked,
    });
    await movie.save();
    res.status(200).send(movie);
  } catch (err) {
    // console.log(err);
    const errmsg = printMongooseValidationError(err);
    if (errmsg) res.status(400).send(errmsg);
    else {
      console.log(err);
      res
        .status(400)
        .send("internal error other than mongoose validation check console..");
    }
  }
});

router.put("/:id", async (req, res) => {
  try {
    let { error } = validateMovie(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("genre with specific id not found");

    const movie = await Movie.findById(req.params.id);
    movie.title = req.body.title;
    movie.genre = {
      _id: genre._id,
      name: genre.name,
    };
    movie.dailyRentalRate = req.body.dailyRentalRate;
    movie.numberInStock = req.body.numberInStock;
    movie.liked = req.body.liked;

    await movie.save();

    res.status(200).send(movie);
  } catch (err) {
    // console.log(err);
    const errmsg = printMongooseValidationError(err);
    if (errmsg) res.status(400).send(errmsg);
    else {
      console.log(err);
      res
        .status(400)
        .send("internal error other than mongoose validation check console..");
    }
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    const result = await Movie.findByIdAndDelete(req.params.id);
    if (!result) {
      res.status(404).send("Movie not found to delete....");
      return;
    }
    res.status(200).send(movie);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
