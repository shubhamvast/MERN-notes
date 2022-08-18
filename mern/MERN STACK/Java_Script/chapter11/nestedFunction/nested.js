let migrating = true;


  


let fly = function (num) {
  let sound = "Flying";
  for (let i = 0; i < num; i++) {
    wingFlapper();
  }
  function wingFlapper() {
    console.log(sound);
  }

  
};

function quack(num) {
  
    let sound = "Quack";
    for (let i = 0; i < num; i++) {
        quacker();
      }
  let quacker = function () {
    console.log(sound);
  };
  
  
}


if (migrating) {
    fly(4);//4 times flying
    quack(4);//4 times quack
  }