function codeMagnet() {
  var products = [
    "choo choo chocolate",
    "Icy Mint",
    "Cake Batter",
    "Bubblegum",
  ];

  var hasBubblegum = [false, false, false, true];

  var i = 0;

  while (i < hasBubblegum.length) {
    if (hasBubblegum[i]) {
      console.log(products[i] + "   contains bubble gum");
    }

    i = i + 1;
  }
}


codeMagnet();
