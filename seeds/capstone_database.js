// npm run seed
const usersArr = require("../data_seeds/users");
const unitsArr = require("../data_seeds/units");
const categoriesArr = require("../data_seeds/categories");
const ingredientssArr = require("../data_seeds/ingredients");

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
      return knex("ingredients").insert(ingredientssArr);
    });
};
