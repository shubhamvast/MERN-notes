const home = require("./routes/home")
const courses = require("./routes/courses")
const http = require("http");


const express = require("express")
const app = express();

app.use(home);
app.use(courses);

const server = http.createServer(app);
server.listen(3000,(req,res)=>{
    console.log("listening on 3000..");
});