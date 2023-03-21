const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.user = {};
    req.user.id = decoded.id;
    req.user.username = decoded.username;
    req.user.admin = decoded.admin;
    console.log(decoded);
    next();
  });
};

module.exports = {
  verifyToken,
};
