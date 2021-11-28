require("dotenv").config();
const express = require("express");
const app = express();
const readFile = require("./utils/manageFiles");
const knex = require("knex")(require("./knexfile").development);
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cors = require("cors");

const PORT = process.env.PORT || process.env.LOCAL_PORT;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// routes
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const usersRoutes = require("./routes/users");

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/users", usersRoutes);

app.listen(process.env.PORT || PORT, () => {
  console.log("Listening server OR port 8080");
});

// https://shrouded-peak-10650.herokuapp.com/images/cooking.jpg
