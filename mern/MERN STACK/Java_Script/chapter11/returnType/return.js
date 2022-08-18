let justAVar = "Oh, don't you worry about it, I'm GLOBAL";
let x=99;
function whereAreYou() {

    let justAVar = "Just an every day LOCAL";
    let x=8;

    function inner() {
    
    return justAVar;

}
  return inner();
}

let result = whereAreYou();

console.log(x);
