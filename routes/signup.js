require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const knex = require("knex")(require("../knexfile").development);
const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.post("/", (req, res) => {
  const { first_name, last_name, password, email } = req.body;
  //   console.log(req.body);
  //   if (!req.body || !first_name || !last_name || !password || !email) {
  //     res.status(404).json({ message: "Missing information" });
  //   } else {
  knex("users")
    .then((usersData) => {
      const foundUser = usersData.find(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );
      if (foundUser) {
        res.status(400).json({ message: "Email already registered" });
      } else {
        knex("users")
          .insert({
            first_name: first_name,
            last_name: last_name,
            password: password,
            email: email.toLowerCase(),
          })
          .then(() => {
            const token = jwt.sign(
              {
                first_name,
                last_name,
                email,
                loginTime: Date.now(),
              },
              SECRET_KEY,
              { expiresIn: "2h" }
            );
            res.status(200).json(token);
          });
      }
    })
    .catch((error) => {
      res.status(400).json({
        message: `Error getting users` + error,
      });
    });
  //   }
});

module.exports = router;
