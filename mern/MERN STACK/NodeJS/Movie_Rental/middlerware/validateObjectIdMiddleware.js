const { isBoolean } = require("lodash");
const mongoose  = require("mongoose")

module.exports=function(req,res,next){
  const isValid=  mongoose.Types.ObjectId.isValid(req.params.id);
    if(!isValid)  return res.status(400).send("Invalid id : "+req.params.id);
    next();
}