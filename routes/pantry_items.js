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
    jwt.verify(authToken, SECRET_KEY, (err, decode) => {
      if (err) {
        res.status(403).json({ message: "Invalid or expired token" });
      } else {
        knex("pantry_items")
          .where("user_id", decode.id)
          .then((data) => {
            res.status(200).json(data);
          })
          .catch(() => {
            res.status(400).json({
              message: `Error getting users`,
            });
          });
      }
    });
  })
  .put((req, res) => {
    const auth = req.body.headers.Authorization;
    const authToken = auth.split(" ")[1];
    const { newPantryItems } = req.body.body;

    jwt.verify(authToken, SECRET_KEY, (err, decode) => {
      if (err) {
        res.status(403).json({ message: "Invalid or expired token" });
      } else {
        const newArr = newPantryItems.map((item) => {
          return { ...item, user_id: decode.id };
        });

        knex("pantry_items")
          .where("user_id", decode.id)
          .del()
          .then((data) => {
            if (newPantryItems.length > 0) {
              knex("pantry_items")
                .insert(newArr)
                .then(() => {
                  return knex("pantry_items").where("user_id", decode.id);
                })
                .then((data) => {
                  res.status(200).json(data);
                });
            } else {
              res.status(200).json(newPantryItems);
            }
          })
          .catch(() => {
            res.status(400).json({
              message: `Error getting users`,
            });
          });
      }
    });
  })
  .post((req, res) => {
    const { addPantryItems, ownerId } = req.body.body;

    if (addPantryItems.length > 0) {
      const newArr = addPantryItems.map((item) => {
        return { ...item, user_id: ownerId };
      });
      knex("pantry_items")
        .insert(newArr)
        .then(() => {
          return knex("pantry_items").where("user_id", ownerId);
        })
        .then((data) => {
          res.status(200).json(data);
        })
        .catch(() => {
          res.status(400).json({
            message: `Error getting users`,
          });
        });
    } else {
      knex("pantry_items")
        .where("user_id", ownerId)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch(() => {
          res.status(400).json({
            message: `Error getting users`,
          });
        });
    }
  });

module.exports = router;
