const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Unauthorized request");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized request");
    }
    req.user = {};
    req.user.id = decoded.id;
    req.user.username = decoded.username;
    console.log(decoded);
    next();
  });
};

module.exports = {
  verifyToken,
};
