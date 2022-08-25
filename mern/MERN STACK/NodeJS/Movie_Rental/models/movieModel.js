const { default: mongoose } = require("mongoose");

const { genreSchema } = require("../models/genreModel");

// const {schema} = mongoose;
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: [5, "title should have minimum 5 chars"],
    maxLength: [50, "title should have maximum 50 chars"],
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    min: [0, "dailyRentalRate have minimum zero chars"],
    max: [255, "dailyRentalRate have maximum 50 chars"],
    required: true,
  },
  numberInStock: {
    type: Number,
    min: [0, "numberInStock have minimum zero chars"],
    max: [255, "numberInStock have maximum 50 chars"],
    required: true,
  },
  liked: {
    type: Boolean,
    default: false,
  },
});

const Movie = mongoose.model("movie", movieSchema);

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    liked: Joi.boolean(),
  });
  return schema.validate(movie);
}

function printMongooseValidationError(err) {
  let errmsg = "";
  for (let field in err.errors) {
    errmsg = errmsg + "\n" + err.errors[field].message;
  }
  return errmsg;
}

module.exports = {
  Movie,
  validateMovie,
  printMongooseValidationError,
  movieSchema,
};
