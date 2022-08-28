const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [5, "min length of name 5 user"],
    maxLenght: [50, "max lenght of name 50 user"],
    required: true,
  },
  email: {
    type: String,
    minLength: [5, "min length of email 5 user"],
    maxLenght: [255, "max length of email 255 user"],
    required: true,
  },
  password: {
    type: String,
    minLength: [5, "min length of password 5 user"],
    maxLenght: [1024, "max length of password 1024"],
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("user", userSchema);

const Joi = require("joi");
function validateUser(user) {
  const joiSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(1024).required(),
    isAdmin: Joi.boolean(),
  });
  return joiSchema.validate(user);
}


function printMongooseValidationError(err) {
    let errmsg = "";
    for (let field in err.errors) {
      errmsg = errmsg + "\n" + err.errors[field].message;
    }
    return errmsg;
  }
  
  

module.exports = { User, userSchema, validateUser,printMongooseValidationError };
