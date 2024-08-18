const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/constants");
const CustomError = require("../utils/customError");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    const err = new CustomError("Please Login First.", 401);
    return next(err);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userName = decoded.userName;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    const err = new CustomError(
      "Invalid or expired token. Please login again.",
      401
    );
    return next(err);
  }
};

module.exports = auth;
