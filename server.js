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
const categoriesRoutes = require("./routes/categories");
const unitsRoutes = require("./routes/units");
const groceryRoutes = require("./routes/grocery_list");
const groceryUsersRoutes = require("./routes/grocery_list_users");
const groceryItemsRoutes = require("./routes/grocery_list_items");
const pantryItemsRoutes = require("./routes/pantry_items");

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/users", usersRoutes);
app.use("/categories", categoriesRoutes);
app.use("/units", unitsRoutes);
app.use("/grocery", groceryRoutes);
app.use("/grocery-users", groceryUsersRoutes);
app.use("/grocery-items", groceryItemsRoutes);
app.use("/pantry-items", pantryItemsRoutes);

app.listen(process.env.PORT || PORT, () => {
  console.log("Listening server OR port 8080");
});

// https://shrouded-peak-10650.herokuapp.com/images/cooking.jpg
