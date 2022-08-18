let a = 88;

function first() {
  return function second() {
    
      console.log(a);

  };
}

let b = first();
b();
