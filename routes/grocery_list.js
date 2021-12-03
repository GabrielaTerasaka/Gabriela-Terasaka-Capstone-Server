require("dotenv").config();

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

    knex("grocery_list")
      .select({
        id: "grocery_list.id",
        title: "title",
        owner: "first_name",
        userId: "users.id",
      })
      .join("users", "users.id", "grocery_list.user_id")
      .where({ user_id: user.id })
      .then((ownData) => {
        knex("grocery_list_users")
          .join("grocery_list", "grocery_list.id", "grocery_list_users.list_id")
          .join("users", "users.id", "grocery_list.user_id")
          .select({
            id: "grocery_list.id",
            title: "grocery_list.title",
            owner: "first_name",
            userId: "users.id",
          })
          .where("grocery_list_users.user_id", user.id)
          .then((sharedData) => {
            res.status(200).json([...ownData, ...sharedData]);
          })
          .catch(() => {
            res.status(400).json({
              message: `Error getting users`,
            });
          });
      })
      .catch(() => {
        res.status(400).json({
          message: `Error getting users`,
        });
      });
  })
  .post((req, res) => {
    const auth = req.body.headers.Authorization;
    const authToken = auth.split(" ")[1];
    const user = jwt.verify(
      authToken,
      process.env.SECRET_KEY,
      (err, decode) => {
        return decode;
      }
    );
    const newList = {
      title: `List - ${user.first_name}`,
      user_id: user.id,
    };

    knex("grocery_list")
      .insert(newList)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(() => {
        res.status(400).json({
          message: `Error getting users`,
        });
      });
  })
  .put((req, res) => {});

router
  .route("/:id", authorize)
  .get((req, res) => {
    const listId = req.params.id;
    knex("grocery_list")
      .select({
        id: "grocery_list.id",
        title: "title",
        owner: "first_name",
        ownerId: "users.id",
      })
      .join("users", "users.id", "grocery_list.user_id")
      .where("grocery_list.id", listId)
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
    const { title } = req.body.body;

    knex("grocery_list")
      .update({ title: title })
      .where("id", listId)
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
    const listId = req.params.id;

    knex("grocery_list")
      .where("id", listId)
      .del()
      .then((data) => {
        res.status(200).json({ message: "list successfully deleted" });
      })
      .catch(() => {
        res.status(400).json({
          message: `Error getting users`,
        });
      });
  });

module.exports = router;
