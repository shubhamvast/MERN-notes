const express = require("express");
const router = express.Router();
router.use(express.json());

const auth = require("../middlerware/authMiddlerware")
const admin = require("../middlerware/adminMiddlerware")
const validateObjectId = require("../middlerware/validateObjectIdMiddleware");


const {
  Rental,
  validateRental,
  printMongooseValidationError,
  rentalSchema,
} = require("../models/rentalModel");

router.get("/", async (req, res) => {
  try {
    const rentals = await Rental.find({});
    if (rentals.length == 0)
      return res.status(404).send("rentals not in database...");
    res.status(200).send(rentals);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:id",validateObjectId, async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental)
      return res.status(400).send("rental not in database with specific id...");
    res.status(200).send(rental);
  } catch (err) {
    res.status(400).send(err);
  }
});

const mongoose = require("mongoose");
const { Customer } = require("../models/customerModel");
const { Movie } = require("../models/movieModel");
router.post("/", async (req, res) => {
  try {
    let { error } = validateRental(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    const customerId = req.body.customerId;
    const movieId = req.body.movieId;

    const customer = await Customer.findById(customerId);
    if (!customer) {
      res
        .status(404)
        .send("customer with specific id not found in customer collection");
      return;
    }
    // return res.send(customer);
    const movie = await Movie.findById(movieId);
    if (!movie) {
      res
        .status(404)
        .send("movie with specific id not found in movie collection");
      return;
    }
    const rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        genre: movie.genre,
        dailyRentalRate: movie.dailyRentalRate,
        numberInStock: movie.numberInStock - 1,
        // numberInStock: -1,

        liked: movie.liked,
      },
      rentalFee: movie.dailyRentalRate * 10,
      dateOut: Date.now(),
    });

    const session = await Rental.startSession();

    session.startTransaction();

    try {
      await rental.save();
      // throw Error;
      movie.numberInStock = movie.numberInStock - 1;
      await movie.save();
    } catch (err) {
      session.abortTransaction();
      throw err;
    }
    session.commitTransaction();
    session.endSession();
    res.status(200).send(rental);
  } catch (err) {
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

router.patch("/:id",validateObjectId,auth, async (req, res) => {
  try {
    let rental = await Rental.findById(req.params.id);
    // return res.send(rental)

    if (!rental) {
      res.status(400).send("rental with specific id not found");
      return;
    }

    if (rental.dateIn) {
      res.status(400).send("Invalid rental ...");
      return;
    }

    rental.dateIn = Date.now();
    // rental.dateIn = "shbubham";

    // return  res.send(rental);

    rental.movie.numberInStock += 1;

    let movie = await Movie.findOne({ _id: rental.movie._id });
    // return res.send(movie)
    if (!movie) return res.status(400).send("movie not found wit specific id");

    movie.numberInStock = movie.numberInStock + 1;

    const session = await Rental.startSession();
    session.startTransaction();

    try {
      await rental.save();
      await movie.save();
    } catch (error) {
      session.abortTransaction();
      throw error;
    }

    session.commitTransaction();
    session.endSession();

    res.status(200).send(rental);
  } catch (err) {
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

router.delete("/:id",validateObjectId,auth,admin,async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);

    const session = await Rental.startSession();
    session.startTransaction();
    try {
      const result = await Rental.findByIdAndDelete(req.params.id);
      if (!result) {
        res.status(404).send("Rental not found to delete....");
        return;
      }
      if (!rental.dateIn) {
        const movie = await Movie.findById(rental.movie._id);
        if (!movie) {
          res.status(404).send("movie not found with specific id....");
          return;
        }
        movie.numberInStock += 1;
        await movie.save();
      }
    } catch (error) {
      session.abortTransaction();
      throw error;
    }
    session.commitTransaction();
    session.endSession();
    res.status(200).send(rental);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
