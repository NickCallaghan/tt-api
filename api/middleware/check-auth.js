require("dotenv");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// This middleware checks for the presense of an authenticated token before and returns an auth error if not present

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(409).json({ message: "Auth failure" });
  }
};
