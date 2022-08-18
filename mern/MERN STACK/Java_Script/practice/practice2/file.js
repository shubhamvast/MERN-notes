let string = "hello everyone, how are you all!?, hope everybuddy is fine"

// console.log("string.length      "+ string.length);
// console.log("string.slice()     "+ string.slice(2,7));
// console.log("string.charAt()    "+ string.charAt(7));
// console.log("string.concat()    "+ string.concat("I am shubham"));
// console.log("string.indexOf()   "+ string.indexOf("everyone"));
// console.log("string.substring()  "+ string.substring(-5,8));
console.log("string.replace()    "+  string.replace("everyone","everybuddy"));
//case sensitive
//replace only 1 occurance/match
// console.log("string.replace() with regx "+ string.replace(/EVERYONE/i,"everybuddy"));
// console.log("string.replace() all with regx  "+ string.replace(/EVERYONE/g,"everybuddy"));


console.log("string.toUpperCase()   "+ string.toUpperCase());
console.log("string.toLowerCase()   "+ string.toLowerCase());
// let arrayString = string.split(",");
let arrayString = string.split("");

console.log("string.split(",") "+ arrayString+" ==>"+ typeof arrayString);

//access sting like string[i]

console.log("string[i] "+string[3]+ " " +string[9]);
//can't modify don't give error 
//strings are immutable 
string[3] = "x";
console.log("string  : "+ string[3]);

