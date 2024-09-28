const jwt = require("jsonwebtoken");

function UserAuth(req, res, next) {
  const token = req.headers.token;

  const decodedData = jwt.verify(token, process.env.USER_JWT_SECRET);

  if (decodedData) {
    req.userId = decodedData.userId;
    next();
  } else {
    res.status(401).json({
      error: "Incorrect Credientials!",
    });
  }
}

function adminAuth(req, res, next) {
  const token = req.headers.token;

  const decodedData = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

  if (decodedData) {
    req.userId = decodedData.userId;
    next();
  } else {
    res.status(401).json({
      error: "Incorrect Credientials!",
    });
  }
}

module.exports = {
  UserAuth,
  adminAuth,
};
