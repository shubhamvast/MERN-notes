//To manage all get,put,post,delete method
const express = require("express");
const app = express();

//to make validatation
//to set schema structure
const Joi = require("joi");

//return middleware function
//so we can access json objects sent from postman
// reuest.body  we can access otherwise it shown undefine
app.use(express.json());

const genres = [
  { id: 1, name: "action" },
  { id: 2, name: "horror" },
  { id: 3, name: "thriller" },
  { id: 4, name: "drama" },
  { id: 5, name: "western" },
  { id: 6, name: "narrative" },
  { id: 7, name: "fantasy" },
  { id: 8, name: "science fiction" },
  { id: 9, name: "fiction" },
  { id: 10, name: "history" },
  { id: 11, name: "mystery" },
  { id: 12, name: "romantic comedy" },
  { id: 13, name: "comedy" },
  { id: 14, name: "humor" },
  { id: 15, name: "dark comedy" },
  { id: 16, name: "historical drama" },
  { id: 17, name: "screenplay" },
  { id: 18, name: "psychological thriller" },
  { id: 19, name: "horror fiction" },
  { id: 20, name: "slapstick" },
];

// CURD operation

//create
app.post("/api/genres/", (req, res) => {
  validateName(req, res);
  const genre = { id: genres.length + 1, name: req.body.name };
  genres.push(genre);
  res.status(200).send(genre);
});

//update
app.put("/api/genres/:id", (req, res) => {
  const genre = isFind(req, res);
  validateName(req, res);
  const index = genres.indexOf(genre);
  genres[index].name = req.body.name;
  res.status(200).send(genres[index]);
});

//read whole collection
app.get("/api/genres/", (req, res) => {
  if (!genres) res.status(404).send("genres are not there..");

  res.status(200).send(genres);
});

//read specific item
app.get("/api/genres/:id", (req, res) => {
  const genre = isFind(req, res);

  // console.log(req.params);

  res.status(200).send(genre);
});

//delete specific item
app.delete("/api/genres/:id", (req, res) => {
  const genre = isFind(req, res);

  const index = genres.indexOf(genre);

  genres.splice(index, 1);

  res.status(200).send(genre);
});

function isFind(req,res) {
  const genre = genres.find((ele)=>{
   return ele.id === +req.params.id;
  })

  if(!genre) res.status(404).send("not found....");

  return genre;
}

function validateName(req, res) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });

  const { error } = schema.validate(req.body);
  //   console.log(error);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
}

//TO set PORT enviornmental variable
//so we can set PORT dynamically
require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
