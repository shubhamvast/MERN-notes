const express = require("express");
const router = express.Router();
router.use(express.json());
const bcrypt = require("bcrypt");
const {User}=require("../models/userModel");
const {sendMail} = require("../mail/sendEmail");
router.post("/",async(req,res)=>{
    const {error} = validateLoginDetails(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Not a user....");



    const isvalid= await bcrypt.compare(req.body.password,user.password);
    if(!isvalid) {
      res.status(400).send("Invalid User and Password!");
      return;
    }
    sendMail(req.body.email,"Login on movie rental app...","Logged in successfully...");
    res.status(200).send(isvalid);

});


const Joi = require("joi");
function validateLoginDetails(user) {
  const joiSchema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return joiSchema.validate(user);
}


module.exports = router;