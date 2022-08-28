// customer name string, phone string, isGold boolean

const express = require("express");
const router = express.Router();
router.use(express.json());

const {
  Customer,
  validateCustomer,
  printMongooseValidationError,
} = require("../models/customerModel");

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find({});
    if (customers.length==0) {
      res.status(400).send("customers not in database...");
      return;
    }
    res.status(200).send(customers);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      res.status(400).send("customer not in database with specific id...");
      return;
    }
    res.status(200).send(customer);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    let { error } = validateCustomer(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const customer = new Customer({
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    });
    await customer.save();
    res.status(200).send(customer);
  } catch (err) {
    // console.log(err);
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

router.put("/:id", async (req, res) => {
  try {
    let { error } = validateCustomer(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          phone: req.body.phone,
          isGold: req.body.isGold,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!customer) {
      res.status(400).send("customer with specific id not found");
      return;
    }

    res.status(200).send(customer);
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

router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    const result = await Customer.deleteOne({ _id: req.params.id });
    if (result.deletedCount == 0) res.status(200).send("element not found with specific id.....");
    else res.status(200).send(customer);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
