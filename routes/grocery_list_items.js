require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const knex = require("knex")(require("../knexfile").development);
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize");
const router = require("express").Router();

router
  .route("/:id", authorize)
  .get((req, res) => {
    const listId = req.params.id;
    // console.log(listId);
    knex("grocery_list_items")
      // .select({ id: "grocery_list.id", title: "title", owner: "first_name" })
      // .join("users", "users.id", "grocery_list.user_id")
      .where("list_id", listId)
      .then((data) => {
        // console.log(listId);
        // console.log(data);
        res.status(200).json(data);
      })
      .catch(() => {
        res.status(400).json({
          message: `Error getting users`,
        });
      });
  })
  .put((req, res) => {
    const listId = req.params.id;
    const { newListItems } = req.body.body;
    // console.log(newListItems);
    knex("grocery_list_items")
      .where("list_id", listId)
      .del()
      .then(() => {
        // console.log("deleted");
        return knex("grocery_list_items").insert(newListItems);
      })
      .then(() => {
        // console.log(data);
        return knex("grocery_list_items").where("list_id", listId);
      })
      .then((data) => {
        // console.log(data);
        res.status(200).json(data);
      })
      .catch(() => {
        res.status(400).json({
          message: `Error getting users`,
        });
      });
  });

module.exports = router;
