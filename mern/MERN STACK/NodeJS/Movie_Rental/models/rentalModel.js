const mongoose = require("mongoose");

const { movieSchema } = require("../models/movieModel");
const rentalSchema = new mongoose.Schema({
  customer:{type: new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,

    name: {
      type: String,
      required: true,
      minLength: [5, "name should be greater than 5 chars"],
      maxLength: [50, "name should be less 50 chars"],
    },
  
    phone: {
      type: String,
      minLength: [7, "phone should be minimum 7 digits"],
      maxLength: [10, "phone should be maximum 10 digits"],
      required: true,
    }
  }),
  required:true
},
  movie: { type: movieSchema, required: true },
  rentalFee: {
    type: Number,
    required: true,
    min: [0, "minimum rental fee 0 rentalModel"],
  },
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



