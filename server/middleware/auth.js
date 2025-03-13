const jwt = require("jsonwebtoken");

// Middleware to check if user is authenticated
function auth(req, res, next) {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.payload = decoded;

    next();
  } catch (error) {
    res.status(400).json(error);
  }
}

// Middleware to check if user is admin
function isAdmin(req, res, next) {
  if (!req.payload.isAdmin)
    return res
      .status(403)
      .json({ message: "Access denied. Admin permission required." });
  next();
}

// Middleware to check if user is business
function isBusiness(req, res, next) {
  if (!req.payload.isBusiness)
    return res
      .status(403)
      .json({ message: "Access denied. Business user permission required." });
  next();
}

module.exports = {
  auth,
  isAdmin,
  isBusiness,
};
