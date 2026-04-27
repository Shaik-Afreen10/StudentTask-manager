const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).send("No token");

  try {
    const verified = jwt.verify(token, "secretkey");
    req.user = verified;
    next();
  } catch {
    res.status(400).send("Invalid token");
  }
}

module.exports = auth;