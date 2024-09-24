const writeToFile = require("../Utils/writeToFile.js");
module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (baseUrl === "/api/movies/") {
    if (!regex.test(id)) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ msg: "Invalid UUID" }));
      res.end();
    } else if (regex.test(id)) {
      let movieToBeDeleted = req.movies.findIndex((e) => e.id == id);
      req.movies.splice(movieToBeDeleted, 1);

      writeToFile(req.movies);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ msg: "Deleted Successfully" }));
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({ msg: "Route Not Found" }));
    res.end();
  }
};
