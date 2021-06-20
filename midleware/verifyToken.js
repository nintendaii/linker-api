const jwt = require("jsonwebtoken");
const config = require("config");

function verifyToken(req, res, next) {
  const headers = req.headers["authorization"];
  if (typeof headers == "undefined")
    return res.status(403).send({ code: "no_auth_header" });
  try {
    const token = headers.split(" ")[1];
    const payload = jwt.verify(token, config.get("jwtSecret")).payload;
    req.payload = payload;
    next();
  } catch (error) {
    return res.status(403).send({ code: "jwt_expired", data: error });
  }
}

module.exports = { verifyToken };
