# Node.js Web Server

### web server

--> access web pages of any web application

--> handle all the HTTP requests for web application

> node provide you to create your own web server

> which handles HTTP requests asynchronously

### My own web server...

```javascript
import http from "http";

const server = http.createServer(function (request, response) {
  // request and response -> parameters supplied by node.js
  // request object -> get info about current HTTP request  (url,request header,data)
  // response object -> to send a response for a current request

  response.end("Reply from server side ");
  // end() is must cuz without it user get nothing on screen
});

server.listen(8000, "127.0.0.1", () => {
  console.log("lisstening to port 8000 ");
});
```

### How to manage request and response on own web server

```javascript
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

// to register our port
server.listen(8000, "127.0.0.1", () => {
  console.log("lisstening to port 8000 ");
});
```

> request.url

it fetch url from search bar => http://localhost:8000/aboutUs

> response.write("HOME PAGE")

just display message on web page

> response.end();

done all appropriate acitvity to any user requst

> response.writeHead(404, { "content-type": "text/html" });

we must write response HEAD before responding to user

> response.end("ABOUT US PAGE");

done boths work for us that is response.write("ABOUT US PAGE"); + response.end();

```bash
("<h1>Error page not found </h1>")
```

To print content as HTML tags

>
