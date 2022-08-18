const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true })); //post object key and value in postman app

app.post("/", (req, res) => {
  res.send(req.body);
});

app.listen(3000, () => {
  console.log("listening 3000");
});
