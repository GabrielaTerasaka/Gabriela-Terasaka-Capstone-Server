const fs = require("fs");

module.exports = readFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath));
};

module.exports = writeFile = (filePath, data) => {
  fs.writeFile(filePath, JSON.stringify(data), (error) => {
    if (error) {
      res.status(500).json({ message: "Error in writing the file" });
      return "error";
    } else {
      res.status(200).json({ message: "Inventory deleted successfully" });
      return "ok";
    }
  });
};
