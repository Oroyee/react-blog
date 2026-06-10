const jwt = require("jsonwebtoken");

// 驗證請求是否帶有合法的 JWT。通過後將 payload 掛到 req.user。
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    return res.status(401).json("You are not authenticated!");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }
    req.user = payload; // { id, username }
    next();
  });
}

module.exports = verifyToken;
