// const logger = require("./logger");

// console.log(typeof logger);

// logger.log("hello India");

// console.log(logger.add(4,5));

// console.log(__dirname);

// console.log(__filename);


const students = require("./student.json");

console.log(students);

students.forEach(student => {
    console.log("name : "+student.name +"  "+ "age: "+ student.age);
});