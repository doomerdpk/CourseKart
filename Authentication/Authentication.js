const jwt = require("jsonwebtoken");

function authenticate(secret) {
  return function (req, res, next) {
    const token = req.headers.token; // Get token from Authorization header

    if (!token) {
      return res.json({ error: "JWT token is required!" });
    }

    const decodedData = jwt.verify(token, secret);
    if (decodedData) {
      req.userId = decodedData.userId;
      next();
    }
  };
}

if (!process.env.USER_JWT_SECRET || !process.env.ADMIN_JWT_SECRET) {
  console.error("JWT secrets are missing in environment variables.");
  throw new Error("JWT secrets are required");
}

const UserAuth = authenticate(process.env.USER_JWT_SECRET);
const AdminAuth = authenticate(process.env.ADMIN_JWT_SECRET);

module.exports = {
  UserAuth,
  AdminAuth,
};
