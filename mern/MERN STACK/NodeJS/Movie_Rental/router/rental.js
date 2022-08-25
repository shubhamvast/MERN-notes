const express = require("express");
const router = express.Router();
router.use(express.json());

const {
  Rental,
  validateRental,
  printMongooseValidationError,
} = require("../models/rentalModel");

router.get("/", async (req, res) => {
  try {
    const rentals = await Rental.find({});
    if (!rentals) return res.status(400).send("rentals not in database...");
    res.status(200).send(rentals);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:id", async (req, res) => {
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
        name: customer.name,
        phone: customer.phone,
      },
      movie: {
        title: movie.title,
        genre: movie.genre,
        dailyRentalRate: movie.dailyRentalRate,
        numberInStock: movie.numberInStock,
        liked: movie.liked,
      },
      rentalFee: movie.dailyRentalRate * 10,
      dateOut: Date.now(),
      dateIn: null,
    });

    await rental.save();
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

router.patch("/:id", async (req, res) => {
  try {
    const rental = await Rental.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          dateIn: Date.now(),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!rental) {
      res.status(400).send("rental with specific id not found");
      return;
    }

    res.status(200).send(rental);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    const result = await Rental.findByIdAndDelete(req.params.id);
    if (!result) {
      res.status(404).send("Rental not found to delete....");
      return;
    }
    res.status(200).send(rental);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
