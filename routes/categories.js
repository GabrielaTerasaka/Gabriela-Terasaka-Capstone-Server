require("dotenv").config();

const knex = require("knex")(require("../knexfile").development);
const authorize = require("../middleware/authorize");
const router = require("express").Router();

router.route("/", authorize).get((req, res) => {
  knex("categories")
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
