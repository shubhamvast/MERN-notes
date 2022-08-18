 let object = {
    name : "shubham",
    age : 34,
    employeeId : 101
}

 
const convertToJson = JSON.stringify(object);

import fs from "fs";

fs.readFile("apifile.json","utf-8",(error,data)=>{
    
    console.log(error);

    console.log(data);
    
})