require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const knex = require("knex")(require("../knexfile").development);
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize");
const router = require("express").Router();

router
  .route("/", authorize)
  .get((req, res) => {
    const auth = req.headers.authorization;
    const authToken = auth.split(" ")[1];
    const user = jwt.verify(
      authToken,
      process.env.SECRET_KEY,
      (err, decode) => {
        return decode;
      }
    );

    knex("grocery_list_users")
      .join("users", "users.id", "grocery_list_users.user_id")
      .select({
        shared_user_name: "first_name",
        list_id: "list_id",
        user_id: "user_id",
      })

      .then((sharedUsers) => {
        // console.log(sharedUsers);
        res.status(200).json(sharedUsers);
      })
      .catch(() => {
        res.status(400).json({
          message: `Error getting users`,
        });
      });
  })
  // .catch(() => {
  //   res.status(400).json({
  //     message: `Error getting users`,
  //   });
  // })
  // })
  .post((req, res) => {
    // const listId = req.params.id;
    const { userId, listId } = req.body.body;
    // console.log(title);
    knex("grocery_list_users")
      .insert({ user_id: userId, list_id: listId })
      .then((data) => {
        // console.log(data);
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
