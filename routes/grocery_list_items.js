require("dotenv").config();

const knex = require("knex")(require("../knexfile").development);
const authorize = require("../middleware/authorize");
const router = require("express").Router();

router
  .route("/:id", authorize)
  .get((req, res) => {
    const listId = req.params.id;

    knex("grocery_list_items")
      .where("list_id", listId)
      .then((data) => {
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

    knex("grocery_list_items")
      .where("list_id", listId)
      .del()
      .then(() => {
        if (newListItems.length > 0) {
          knex("grocery_list_items")
            .insert(newListItems)
            .then(() => {
              return knex("grocery_list_items").where("list_id", listId);
            })
            .then((data) => {
              res.status(200).json(data);
            });
        } else {
          res.status(200).json(newListItems);
        }
      })
      .catch(() => {
        res.status(400).json({
          message: `Error getting users`,
        });
      });
  });

module.exports = router;
