const { default: mongoose } = require("mongoose");

// const {schema} = mongoose;
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "name should have minimum 3 chars"],
    maxLength: [50, "name should have maximum 50 chars"],
    required: true,
  },
});

const Genre = mongoose.model("genre", genreSchema);

// import npm joi module for validation
const Joi = require("joi");
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });

  return schema.validate(genre);
}

function printMongooseValidationError(err) {

  let errmsg = "";
  for (let field in err.errors) {
    errmsg = errmsg + "\n" + err.errors[field].message;
  }
  return errmsg;

}

module.exports = {
  Genre,
  validateGenre,
  printMongooseValidationError,
  genreSchema,
};
