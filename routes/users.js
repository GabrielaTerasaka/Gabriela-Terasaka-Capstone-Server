const router = require("express").Router();
const knex = require("knex")(require("../knexfile").development);

require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

const authorize = require("../middleware/authorize");

router
  .route("/", authorize)
  .get((req, res) => {
    knex("users")
      .select("first_name", "last_name", "email", "id")
      .then((usersData) => {
        res.status(200).json(usersData);
      })
      .catch(() => {
        res.status(400).json({
          message: `Error getting users`,
        });
      });
  })
  .put((req, res) => {
    const { id, email: emailDecoded } = req.decoded;
    const { first_name, last_name, email: emailBody } = req.body;
    knex("users")
      .where({ email: emailDecoded })
      .then((userData) => {
        if (id !== userData[0].id) {
          res.status(400).json({
            message: "Can not change this account",
          });
          return;
        }
        knex("users").then((usersData) => {
          const foundUser = usersData.find(
            (user) => user.email.toLowerCase() === emailBody.toLowerCase()
          );
          if (foundUser && foundUser.email !== emailDecoded) {
            res.status(400).json({
              message: "Can not use this email. It is already registered",
            });
            return;
          } else {
            knex("users")
              .where({ id })
              .update({ first_name, last_name, email: emailBody })
              .then(() => {
                const token = jwt.sign(
                  {
                    id: id,
                    first_name,
                    last_name,
                    email: emailBody,
                    updateTime: Date.now(),
                  },
                  SECRET_KEY,
                  { expiresIn: "1d" }
                );
                res.status(200).json(token);
              });
          }
        });
      });
  });

router.route("/:email").get(authorize, (req, res) => {
  const { email } = req.params;
  knex("users")
    .select("first_name", "last_name", "email", "id")
    .where({ email })
    .then((userData) => {
      if (userData.length === 1) {
        res.status(200).json(userData);
      } else {
        res.status(400).json({
          message: `Email not found`,
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        message: `Error getting email`,
      });
    });
});
module.exports = router;
