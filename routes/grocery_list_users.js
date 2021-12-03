require("dotenv").config();

const knex = require("knex")(require("../knexfile").development);
const authorize = require("../middleware/authorize");
const router = require("express").Router();

router
  .route("/", authorize)
  .get((req, res) => {
    knex("grocery_list_users")
      .join("users", "users.id", "grocery_list_users.user_id")
      .select({
        shared_user_name: "first_name",
        list_id: "list_id",
        user_id: "user_id",
      })

      .then((sharedUsers) => {
        res.status(200).json(sharedUsers);
      })
      .catch(() => {
        res.status(400).json({
          message: `Error getting users`,
        });
      });
  })
  .post((req, res) => {
    const { userId, listId } = req.body.body;

    knex("grocery_list_users")
      .insert({ user_id: userId, list_id: listId })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => {
        res.status(400).json({
          message: `Error getting users`,
        });
      });
  })
  .delete((req, res) => {
    const { userId, listId } = req.query;

    knex("grocery_list_users")
      .where({ user_id: userId, list_id: listId })
      .del()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => {
        res.status(400).json({
          message: `Error getting users`,
        });
      });
  });

module.exports = router;
