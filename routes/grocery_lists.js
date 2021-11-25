require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const knex = require("knex")(require("../knexfile").development);
const jwt = require("jsonwebtoken");
const router = require("express").Router();

router
  .route("/")
  .get((req, res) => {})
  .post((req, res) => {})
  .put((req, res) => {});

module.exports = router;
