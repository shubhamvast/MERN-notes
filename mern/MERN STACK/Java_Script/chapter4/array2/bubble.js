let scores = [
  60, 50, 60, 58, 54, 54, 58, 50, 52, 54, 48, 69, 34, 55, 51, 52, 44, 51, 69,
  64, 66, 55, 52, 61, 46, 31, 57, 52, 44, 18, 41, 53, 55, 61, 51, 44,
];

function solutionsGame(scores) {
  console.log("Score of each solution...: ");

  let max = 0;

  let str = [];

  for (let i = 0; i < scores.length; i++) {
    if (max < scores[i]) {
      max = scores[i];
      str = [];
      str.push(i);
    } else if (scores[i] == max) {
      str.push(i);
    }

    console.log("solution " + i + " " + "scores " + scores[i]);
  }

  console.log("total number of solutions ....: " + scores.length);

  console.log("max elements index...: ");

  for (let i = 0; i < str.length; i++) {
    console.log(str[i]);
  }
}

solutionsGame(scores);
