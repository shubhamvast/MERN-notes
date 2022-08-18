function Counter() {
  let counter = 0;

  this.increamentCounter = () => ++counter;

  this.decrementCounter = () => --counter;
}

let counter1 = new Counter();

console.log(counter1.increamentCounter());
console.log(counter1.increamentCounter());
console.log(counter1.increamentCounter());
console.log(counter1.decrementCounter());
