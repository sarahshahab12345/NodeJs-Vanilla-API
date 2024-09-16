// const http = require("http");
// require("dotenv").config();
// const products = require("./Data/products.json");

// const port = process.env.port || 5001;
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "application.json");
//   res.write(JSON.stringify(products));
//   res.end();
// });

// server.listen(port, () => {
//   console.log(`Server is running on ${port}`);
// });

//======================================================================================

const http = require("http");
require("dotenv").config();
const products = require("./Data/products.json");

const getreq = require("./Methods/get-request");
const postreq = require("./Methods/post-request");
const deletereq = require("./Methods/delete-request");
const putreq = require("./Methods/put-request");

const port = process.env.port || 5001;

const server = http.createServer((req, res) => {
  req.products = products;
  switch (req.method) {
    case "GET":
      getreq(req, res);
      break;
    case "POST":
      postreq(req, res);
      break;
    case "DELETE":
      deletereq(req, res);
      break;
    case "PUT":
      putreq(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write({ title: "Not Found", message: "Request Not Found" });
      res.end();
  }
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
