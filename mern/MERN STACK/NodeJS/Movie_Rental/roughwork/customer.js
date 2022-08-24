const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const router = express.Router();
router.use(express.json());
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Name should be atleast 3 characters long"],
    maxLength: [50, "Name should be atmost 50 characters long"],
    required: true,
  },
  phone: {
    type: String,
    minLength: [7, "Phone should be atleast 7 digits long"],
    maxLength: [10, "Name should be atmost 10 digits long"],
    required: true,
  },
  isGold: { type: Boolean, default: false },
});
const Customer = mongoose.model("customer", customerSchema);
// GET all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find({});
    if (!customers)
      return res.status(400).send("customer could not be found..");
    res.status(200).send(customers);
  } catch (error) {
    res.status(404).send("something went wrong!");
  }
});
// GET specific customer by ID:
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
      return res.status(400).send("Customer could not be found...");
    res.status(200).send(customer);
  } catch (error) {
    res.status(404).send("Error occurred!!");
  }
});
//CREATE Customer:
router.post("/", async (req, res) => {
  try {
    validateCustomer(req, res);
    const customer = new Customer({
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    });
    await customer.save();
    res.status(200).send(customer);
  } catch (error) {
    for (let field in error.errors) res.status(404).send();
  }
});
// UPDATE customer.
router.put("/:id", async (req, res) => {
  try {
    validateCustomer(req, res);
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
      },
    });
    res.status(200).send(customer);
  } catch (error) {
    res.status(400).send("Error occurred!");
  }
});
// DELETE customer.
router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.find(req.params.id);
    if (customer) {
      const result = await Customer.findByIdAndDelete({ _id: req.params.id });
      if (!result) return res.status(400).send("elements not found");
      else return res.status(200).send(customer);
    } else return res.status(404).send("customer could not be found...!");
  } catch (error) {
    res.status(400).send("customer is not deleted..");
  }
});
// VALIDATE Customer
function validateCustomer(req, res) {
  let schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(10).max(10).required(),
    isGold: Joi.boolean().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return error;
    // res.status(400).send(error.details[0].message);
  }
}
module.exports = router;
