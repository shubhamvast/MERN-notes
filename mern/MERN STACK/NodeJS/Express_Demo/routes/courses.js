const express = require('express');
const router = express.Router();

router.get('/courses/:id', (req, res, next)=>{
    res.send("getby id method in courses    "+req.params.id);
});
module.exports = router;