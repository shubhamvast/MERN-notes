function makePassword(password) {
  return (passwordGuess)=> passwordGuess === password;
}

function multN(outerNumber) {
  return (innerNumber)=>outerNumber * innerNumber;
}
