const http = require("http");

// console.log(http);

const server = http.createServer(function (req, res) {
  if (req.url === "/") {
    res.write("hello coders...");
    res.end();
  } else if (req.url === "/shubham") {
    res.write("i am pashionpreneour....");
    res.end();
  }
});

server.listen(4444, () => {
  console.log("i am listioning on port 4444...");
});

// const http = require("http");
// const server = http.createServer(function (req, res) {
//   if (req.url === "/") {
//     res.write("Hello World");
//     res.end();
//   } else if (req.url === "/people") {
//     res.write(JSON.stringify(["p1", "p2", "p3"]));
//     res.end();
//   }
// });
// server.listen(3000, () => {
//   console.log(`listening on port 3000`);
// });
