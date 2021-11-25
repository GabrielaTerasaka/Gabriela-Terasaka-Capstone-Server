const router = require("express").Router();
const knex = require("knex")(require("../knexfile").development);

/*
 * Get all users
 */
router
  .route("/")
  .get((req, res) => {
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
  .post();

module.exports = router;
