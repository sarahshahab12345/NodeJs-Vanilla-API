const bodyParser = require("../Utils/body-parser.js");
const writeToFile = require("../Utils/writeToFile.js");
const crypto = require("crypto");

module.exports = async (req, res) => {
  if (req.url === "/api/movies" || req.url === "/api/movies/") {
    let body = await bodyParser(req);
    body.id = crypto.randomUUID();
    req.movies.push(body);
    writeToFile(req.movies);
    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({ msg: "Created Successfully" }));
    res.end();
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({ msg: "Route Not Found" }));
    res.end();
  }
};
