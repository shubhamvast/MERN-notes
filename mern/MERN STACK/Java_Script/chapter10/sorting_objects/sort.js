var products = [
  { name: "Grapefruit", calories: 170, color: "red", sold: 8200 },
  { name: "Orange", calories: 160, color: "orange", sold: 12101 },
  { name: "Cola", calories: 210, color: "caramel", sold: 25412 },
  { name: "Diet Cola", calories: 0, color: "caramel", sold: 43922 },
  { name: "Lemon", calories: 200, color: "clear", sold: 14983 },
  { name: "Raspberry", calories: 180, color: "pink", sold: 9427 },
  { name: "Root Beer", calories: 200, color: "caramel", sold: 9909 },
  { name: "Water", calories: 0, color: "clear", sold: 62123 },
];

let newProduct = products
  .sort((obj1, obj2) => {
    return obj1.calories - obj2.calories;
  })
  .sort((obj1, obj2) => {
    if (obj1.calories < obj2.calories) return 0;
    else if (obj1.calories == obj2.calories && obj1.sold < obj2.sold) return 1;
    else if (obj1.calories == obj2.calories && obj1.sold > obj2.sold) return -1;
  });

console.log(newProduct);
