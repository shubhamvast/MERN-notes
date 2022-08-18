let costs = [
  0.25, 0.27, 0.25, 0.25, 0.25, 0.25, 0.33, 0.31, 0.25, 0.29, 0.27, 0.22, 0.31,
  0.25, 0.25, 0.33, 0.21, 0.25, 0.25, 0.25, 0.28, 0.25, 0.24, 0.22, 0.2, 0.25,
  0.3, 0.25, 0.24, 0.25, 0.25, 0.25, 0.27, 0.25, 0.26, 0.29,
];

let scores = [
  60, 50, 60, 58, 54, 54, 58, 50, 52, 54, 48, 69, 34, 55, 51, 52, 44, 51, 69,
  64, 66, 55, 52, 61, 46, 31, 57, 52, 44, 18, 41, 53, 55, 61, 51, 44,
];

function findOptimalSolution(scores, costs) {
  let optimalCost = 0;
  let index = -1;
  let m = -1;
  for (let i = 0; i < costs.length; i++) {
    let cost = scores[i] / costs[i];

    if (cost > optimalCost) {
      optimalCost = cost;
      m = i;
    }
  }
  console.log(scores[m] + "   " + costs[m]);
}

findOptimalSolution(scores, costs);
