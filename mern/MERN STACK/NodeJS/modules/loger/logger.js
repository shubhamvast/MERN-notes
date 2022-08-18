function log(message) {
  console.log("log " + message);
}

module.exports.log = log;

module.exports.add = function(a,b){
    return a+b;
}