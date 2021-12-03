// npm run seed
const usersArr = require("../data_seeds/users");
const unitsArr = require("../data_seeds/units");
const categoriesArr = require("../data_seeds/categories");
const groceryListsArr = require("../data_seeds/grocery_list");
const groceryUsersArr = require("../data_seeds/grocery_list_users");
const groceryItemsArr = require("../data_seeds/grocery_list_items");
const pantryItemsArr = require("../data_seeds/pantry_items");

exports.seed = function (knex) {
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
      return knex("grocery_list").insert(groceryListsArr);
    })
    .then(function () {
      return knex("grocery_list_users").insert(groceryUsersArr);
    })
    .then(function () {
      return knex("grocery_list_items").insert(groceryItemsArr);
    })
    .then(function () {
      return knex("pantry_items").insert(pantryItemsArr);
    });
};
