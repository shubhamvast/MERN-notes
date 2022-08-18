import http from "http";

const server = http.createServer(function (request, response) {
  if (request.url == "/") {
    response.write("HOME PAGE");
    response.end();
  } else if (request.url == "/contactUs") {
    response.end("CONTACT US PAGE");
  } else if (request.url == "/aboutUs") {
    response.end("ABOUT US PAGE");
  } else {
    // set head cuz it will show status request done by client
    // 404 is specially for client error
    //state code
    response.writeHead(404, { "content-type": "text/html" });
    //{"content-type": "text/html"} it is to said server its my html text or doc

    response.end("<h1>Error page not found </h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("lisstening to port 8000 ");
});
