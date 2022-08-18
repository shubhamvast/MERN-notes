const fs = require("fs");

// fs.mkdirSync("Thapa");

// fs.writeFile("Thapa/bio.txt", "hello guies I am shubham ....", (err) => {
//   if (err) console.log("error in read.txt");
// });

// fs.appendFile("Thapa/bio.txt"," Using async method...",function(err){
//     console.log(err);
// })

// fs.readFile("Thapa/bio.txt","utf-8",(err,data)=>{
//     if(err) console.log(err);
//     console.log(data);
// })

// fs.rename("Thapa/bio.txt","Thapa/mybio.txt",(err)=>{
//     console.log(err);
// })


// fs.unlink("Thapa/mybio.txt",(err)=>{
//     console.log(err);
// })

fs.rmdir("Thapa",(err)=>{
    console.log(err);
})