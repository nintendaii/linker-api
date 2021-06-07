const jwt = require("jsonwebtoken");
const config = require("config");

function verifyToken(req, res, next) {
  const headers = req.headers["authorization"];
  if (typeof headers == "undefined")
    return res.status(403).send({ msg: "Forbidden" });
  const token = headers.split(" ")[1];
  req.token = token;
  next();
}

module.exports = { verifyToken };
