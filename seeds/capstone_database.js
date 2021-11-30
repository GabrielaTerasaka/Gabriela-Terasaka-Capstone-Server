// npm run seed
const usersArr = require("../data_seeds/users");
const unitsArr = require("../data_seeds/units");
const categoriesArr = require("../data_seeds/categories");
const ingredientsArr = require("../data_seeds/ingredients");
const groceryListsArr = require("../data_seeds/grocery_list");
const groceryUsersArr = require("../data_seeds/grocery_list_users");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert(usersArr);
    })
    .then(function () {
      return knex("units").insert(unitsArr);
    })
    .then(function () {
      return knex("categories").insert(categoriesArr);
    })
    .then(function () {
      return knex("ingredients").insert(ingredientsArr);
    })
    .then(function () {
      return knex("grocery_list").insert(groceryListsArr);
    })
    .then(function () {
      return knex("grocery_list_users").insert(groceryUsersArr);
    });
};
