// // Test for jokes
// var joke = "JavaScript walked into a bar....";
// var toldJoke = false;
// var $punchline = "Better watch out for those semi-colons.";
// var entage = 20;
// var result;
// if (toldJoke == false) {
//   alert($punchline);
// } else alert(joke);

// var zipCode = 98104;
// var joe = "sFavoriteMovie Forbidden Planet";
// var movieTicket$ = 9;
// if (movieTicket$ > 9) {
// alert("Too much!");
// } else {
// alert("We're going to see " + joe+  "sFavoriteMovie");
// }
let count = 0;
const myName = [
  "ashwarya",
  "prashant",
  "vyaktesh",
  "pradip",
  "ashish",
  "nitin",
  "prajwal",
  "shubham",
  "sidhesh",
  "dinakar",
  "tanmay",
  "omkar",
];
while (count < 12) {
  let i = 0;
  while (i < 2) {
    document.write("happy birthday to you" + ",<br>");
    i++;
  }
  let n = myName[count];
  document.write("happy birthday dear " + n + ",<br>");

  document.write("happy birthday to you." + "<br> <br> <br>");
  count++;
}
