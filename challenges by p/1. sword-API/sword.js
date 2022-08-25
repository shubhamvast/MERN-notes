const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/sword/:people/:skip", (req, res) => {
  let people = +req.params.people;
  let skip = +req.params.skip;

  let array = [];
  for (let i = 0; i < people; i++) {
    array.push(i + 1);
  }

  let sword = 0;

  let num = findAlive(array, sword, skip, people);
  res.status(200).send(num+" ");
});

function findAlive(array, sword, skip, people) {
  console.log("hello");
  let position = 0;
  for (let kill = sword + skip + 1; kill < people; kill = kill + (skip + 2)) {
    array[kill] = 0;
    position = kill;
  }
  console.log("\n" + array);

  sword = 0 - (people - position - 1);
  let array2 = [];
  for (let k = 0; k < people; k++) {
    if (array[k] != 0) array2.push(array[k]);
  }

  console.log("\n" + array2);

  let answer = array2;


  if (array2.length > skip + 1) {
   return findAlive(array2, sword, skip, array2.length);
  } else {
    console.log("returned");
    console.log(answer[0]);

    return answer[0];
  }
}

app.listen(3000, (req, res) => {
  console.log("listening on port 3000");
});
