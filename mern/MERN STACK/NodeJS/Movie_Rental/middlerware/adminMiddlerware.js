module.exports = function(req,res,next){
    console.log(req.user);

    const isAdmin = req.user.isAdmin;

    if(!isAdmin) return res.status(403).send("You are not a admin");

    next();
}