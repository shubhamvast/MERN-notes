const express = require("express");
const router = express();
router.use(express.json());

const {
  User,
  userSchema,
  validateUser,
  printMongooseValidationError,
} = require("../models/userModel");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) return res.status(400).send("users not in database...");
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(400).send("user not in database with specific id...");
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    let { error } = validateUser(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });

    await user.save();
    res.status(200).send(user);
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

router.put("/:id", async (req, res) => {
  try {
    let { error } = validateUser(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          isAdmin: req.body.isAdmin,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!user) {
      res.status(400).send("user with specific id not found");
      return;
    }

    res.status(200).send(user);
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

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const result = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send("User not found to delete....");
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
