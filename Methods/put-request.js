const bodyParser = require("../Utils/body-parser.js");
const writeToFile = require("../Utils/writeToFile.js");
module.exports = async (req, res) => {
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
      let movieToBeUpdated = req.movies.filter((mov) => mov.id == id);

      if (movieToBeUpdated.length > 0) {
        let body = await bodyParser(req);
        body.id = id;
        let indexToBeUpdated = req.movies.findIndex((e) => e.id == id);
        req.movies[indexToBeUpdated] = body;
        writeToFile(req.movies);

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({ msg: "Updtaed Successfully" }));
        res.end();
      } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify({ msg: "Movie Not Found" }));
        res.end();
      }
    }
  }
};
