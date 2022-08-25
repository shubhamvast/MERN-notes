const mongoose = require("mongoose");

const { movieSchema } = require("../models/movieModel");
const rentalSchema = new mongoose.Schema({
  customer: {
    name: {
      type: String,
      required: true,
    },
    phone: { type: String, required: true },
  },
  movie: { type: movieSchema, required: true },
  rentalFee: { type: Number, required: true },
  dateOut: {
    type: Date,
    default: Date.now(),
  },
  dateIn: {
    type: Date,
    default: null,
  },
});

const Rental = mongoose.model("rental", rentalSchema);

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

function validateRental(rental) {
  const joiSchema = Joi.object({
    customerId: Joi.objectId(),
    movieId: Joi.objectId(),
  });

  return joiSchema.validate(rental);
}

function printMongooseValidationError(err) {
  let errmsg = "";
  for (let field in err.errors) {
    errmsg = errmsg + "\n" + err.errors[field].message;
  }
  return errmsg;
}

module.exports = {
  Rental,
  validateRental,
  printMongooseValidationError,
  rentalSchema,
};
