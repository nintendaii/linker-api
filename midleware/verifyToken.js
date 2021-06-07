const jwt = require("jsonwebtoken");
const config = require("config");

function verifyToken(req, res, next) {
  const headers = req.headers["authorization"];
  if (typeof headers == "undefined")
    return res.status(403).send({ msg: "Forbidden" });
  try {
    const token = headers.split(" ")[1];
    const payload = jwt.verify(token, config.get("jwtSecret")).payload;
    req.payload = payload;
    next();
  } catch (error) {
    return res.status(403).send({ msg: error });
  }
}

module.exports = { verifyToken };
