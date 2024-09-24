const path = require("path");
const fs = require("fs");

module.exports = (data) => {
  try {
    // C:\Users\Admin\Desktop\New folder (2)\11-1-MERN\Node JS\Vanilla_api_final\data\movies.json
    fs.writeFileSync(
      path.join(__dirname, "..", "data", "movies.json"),
      JSON.stringify(data),
      "utf-8"
    );
  } catch (error) {
    console.error(error);
  }
};
