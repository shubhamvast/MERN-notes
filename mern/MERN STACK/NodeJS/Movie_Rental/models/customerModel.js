const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
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
  },
  isGold: {
    type: Boolean,
    default: false,
  },
});
const Customer = mongoose.model("customer", customerSchema);

//import npm joi module for validation
const Joi = require("joi");
function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
    phone: Joi.string().min(7).max(10).required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(customer);
}
function printMongooseValidationError(err) {
  let errmsg = "";
  for (let field in err.errors) {
    errmsg = errmsg + "\n" + err.errors[field].message;
  }
  return errmsg;
}

module.exports = { Customer, validateCustomer,printMongooseValidationError};
