const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

module.exports = {
  authenticate: (req, res, next) => {
    let token = req.header("x-auth-token");
    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(400).json({
            message: "Invalid token !",
          });
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      return res.status(401).json({
        message: "Access denied !",
      });
    }
  },
};
