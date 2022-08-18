// customer name string, phone string, isGold boolean

const express = require("express");
const router = express.Router();
router.use(express.json());

const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  isGold: Boolean,
});
const Customer = mongoose.model("customer", customerSchema);

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).send(customers);
  } catch (err) {
    res.status(400).send("error in fetching customets...");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.status(200).send(customer);
  } catch (err) {
    res.status(400).send("error in fetching data...");
  }
});

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
  } catch (err) {
    res.status(400).send("cutomer not posted....");
  }
});

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
  } catch (err) {
    res.status(400).send("cutomer not updated....");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    const result = await Customer.deleteOne({ _id: req.params.id });
    if (!result) res.status(200).send(customer);
    else res.status(200).send("element not found.....");
  } catch (err) {
    res.status(400).send("cutomer not delted....");
  }
});

//import npm joi module for validation
const Joi = require("joi");
function validateCustomer(req, res) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(10).max(10).required(),
    isGold: Joi.boolean().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
}

module.exports = router;
