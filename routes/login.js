require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const knex = require("knex")(require("../knexfile").development);
const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.get("/", (req, res) => {
  const { password, email } = req.body;
  knex("users").then((usersData) => {
    const foundUser = usersData.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
    if (!foundUser) {
      res
        .status(403)
        .json({ message: "This user doesn't exist. Please sign up!" });
      return;
    } else if (foundUser.password === password) {
      const token = jwt.sign(
        {
          id: foundUser.id,
          first_name: foundUser.first_name,
          last_name: foundUser.last_name,
          email: foundUser.email,
          loginTime: Date.now(),
        },
        SECRET_KEY,
        { expiresIn: "1d" }
      );
      res.status(200).json(token);
      return;
    } else {
      res.status(403).json({ message: "Invalid username or password" });
      return;
    }
  });
});

module.exports = router;
