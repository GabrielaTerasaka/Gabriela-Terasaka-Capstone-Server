const express = require("express");
const app = express();

const PORT = 8080;

app.use(express.static("public"));
app.use(express.json());

app.listen(process.env.PORT || PORT, () => {
  console.log("Listening server OR port 8080");
});
