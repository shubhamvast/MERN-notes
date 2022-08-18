function authontication(req,res,next){
    console.log("checking.....");
    next();
}

module.exports.authontication = authontication;