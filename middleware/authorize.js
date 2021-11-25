const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const auth = req.body.authorization;
  if (!auth) {
    res.status(401).json({ message: "Missing token" });
  } else {
    const authToken = auth.split(" ")[1];
    jwt.verify(authToken, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        res.status(403).json({ message: "Invalid token" });
      } else {
        req.decoded = decode;
        next();
      }
    });
  }
};
