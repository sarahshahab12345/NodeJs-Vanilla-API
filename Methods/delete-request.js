const writeFile = require("../Utils/writeToFile");
module.exports = (req, res) => {
  let id = req.url.split("/")[3];
  console.log(id);
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (!regex.test(id)) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.write(
      JSON.stringify({
        title: "Not Found",
        message: "Unvalid UUID",
      })
    );
    res.end();
  } else if (regex.test(id)) {
    let data = req.products.filter((e) => e.id != id);
    req.movies = data;
    writeFile(req.movies);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
  }
};
