//using function expressions or anynomous function
// window.onload = init;

// function init() {
//   var cookies = {
//     instructions: "Preheat oven to 350...",
//     bake: function (time) {
//       console.log("Baking the cookies.");
//       setTimeout(function () {
//         alert("Cookies are ready, take them out to cool.");
//         console.log("Cooling the cookies.");
//         setTimeout(function () {
//           alert("Cookies are cool, time to eat!");
//         }, 1000);
//       }, time);
//     },
//   };

//   var button = document.getElementById("bake");

//   button.onclick = function () {
//     console.log("Time to bake the cookies.");
//     cookies.bake(2500);
//   };
// }

// using arrow functions

window.onload = init;

function init() {
  var cookies = {
    instructions: "Preheat oven to 350...",
    bake: (time) => {
      console.log("Baking the cookies.");
      setTimeout(() => {
        alert("Cookies are ready, take them out to cool.");
        console.log("Cooling the cookies.");
        setTimeout(() => alert("Cookies are cool, time to eat!"), 1000);
      }, time);
    },
  };

  var button = document.getElementById("bake");

  button.onclick = () => {
    console.log("Time to bake the cookies.");
    cookies.bake(2500);
  };
}
