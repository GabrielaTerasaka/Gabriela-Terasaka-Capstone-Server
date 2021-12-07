require("dotenv").config();

const { HEROKU_HOST, HEROKU_USER, HEROKU_PASSWORD, HEROKU_DB, HEROKU_PORT } =
  process.env;

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: HEROKU_HOST,
      user: HEROKU_USER,
      password: HEROKU_PASSWORD,
      database: HEROKU_DB,
      port: HEROKU_PORT,
      charset: "utf8",
    },
    pool: { min: 0, max: 10 },
  },
};
