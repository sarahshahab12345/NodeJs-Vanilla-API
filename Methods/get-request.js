module.exports = getProducts = (req, res) => {
  let id = req.url.split("/")[3];

  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  // Case: Base URL for all movies
  if (req.url === "/api/movies" || req.url === "/api/movies/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({ count: req.movies.length, data: req.movies }));
    return res.end(); // Ensure response ends here
  } 

  // Case: Invalid UUID
  if (!regex.test(id)) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({ msg: "Invalid UUID" }));
    return res.end(); // End the response here
  }

  // Case: Valid UUID
  if (regex.test(id)) {
    let filteredData = req.movies.filter((mov) => mov.id == id);
    if (filteredData.length > 0) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({ count: filteredData.length, data: filteredData })
      );
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ msg: "Movie Not Found" }));
    }
    return res.end(); // End the response after handling valid/invalid UUID
  }

  // Case: Unknown Route
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify({ msg: "Route Not Found" }));
  res.end(); // Final response for unknown route
};
