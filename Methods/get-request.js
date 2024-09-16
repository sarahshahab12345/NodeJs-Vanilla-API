module.exports = (req, res) => {
  let baseUrl = req.url;
  let id = baseUrl.split("/")[3];
  console.log(id);

  const uuidRegex =
    /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/i;

  if (req.url === "/api/products/" || req.url === "/api/products") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.products));
    res.end();
  } else if (id != undefined && !uuidRegex.test(id)) {
    console.log("I am, else if");
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.write(
      JSON.stringify({ title: "Validation Failed", message: "Invalid UUID" })
    );
    res.end();
  } else if (id !== undefined && uuidRegex.test(id)) {
    console.log("i am, else if 2.0.3");
    let filteredData = req.products.filter((e) => e.id === id);
    if (filteredData.length > 0) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(filteredData));
      res.end();
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({
          title: "Not Found",
          message: "No Products Found For This Id",
        })
      );
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.write(
      JSON.stringify({ title: "Not Found", message: "Route not Found" })
    );
    res.end();
  }
};
