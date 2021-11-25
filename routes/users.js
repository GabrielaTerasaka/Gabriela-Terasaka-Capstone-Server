const router = require("express").Router();
const knex = require("knex")(require("../knexfile").development);

require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

const authorize = require("../middleware/authorize");

router
  .route("/")
  .get(authorize, (req, res) => {
    console.log(req.decoded);
    knex("users")
      .then((usersData) => {
        res.status(200).json(usersData);
      })
      .catch(() => {
        res.status(400).json({
          message: `Error getting users`,
        });
      });
  })
  .post((req, res) => {})
  .put((req, res) => {});

module.exports = router;
