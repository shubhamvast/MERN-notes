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
    if (users.length== 0) return res.status(400).send("users not in database...");
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

const bcrypt = require("bcrypt");
const lodash = require("lodash");

router.post("/", async (req, res) => {
  try {
    let { error } = validateUser(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    let userExist = await User.findOne({email:req.body.email});
    if(userExist){
      res.status(400).send("User wit given emil_Id already Registered..");
      return;
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password,salt);

    await user.save();

    res.status(200).send(lodash.pick(user,["name","_id","isAdmin","email"]));

    // res.status(200).send({name:user.name,email:user.email,isAdmin:user.isAdmin});
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

    const salt = await bcrypt.genSalt(10);
    encryptedPassword = await bcrypt.hash(req.body.password,salt);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: encryptedPassword,
          // password: req.body.password,

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

    res.status(200).send(lodash.pick(user,["_id","name","email","isAdmin"]));
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
    if (!user) {
      res.status(404).send("User not found to delete....");
      return;
    }
    const result = await User.findByIdAndDelete(req.params.id);
    if(!result) {
      res.status(400).send("User not deleted..");
      return;
    }
    res.status(200).send(lodash.pick(user,["_id","name","email","isAdmin"]));
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
