const express = require('express');
const router = express.Router();
router.get('/', (req, res,next)=>{
    res.send("get method in home");
});
router.post('/', (req, res, next)=>{
   console.log('data: ', req.body.username);
   res.send("post method in home")
});
module.exports = router;