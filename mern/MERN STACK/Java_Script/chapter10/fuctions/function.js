// iife : imidiate invoce function expression

function logic(shape) {
  if (shape.name == "circle"){
    return function (shape) {
        return Math.PI * shape.radius * shape.radius;
      };
  }
  else if (shape.name == "square"){
    return function (side) {
        return side * 4;
      };
  }
  else{
    return function (length, breadth) {
        return length * breadth;
      };
  }
}

let shapes = [
  { name: "circle", radius: 5 },
  { name: "square", side: 4 },
  { name: "rectangle", length: 5, breadth: 6 },
];

shapes.map((shape)=>{logic(shape)()});