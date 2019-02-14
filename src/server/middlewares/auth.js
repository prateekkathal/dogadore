const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (
    !req.headers.authorization ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] !== "Bearer")
  ) {
    return res.status(401).json({
      errors: {
        message: "Authentication Required."
      }
    });
  }

  const accessToken = req.headers.authorization.split(" ")[1];

  jwt.verify(accessToken, "dogadore", (err, decoded) => {
    if (err) {
      switch (err.name) {
        case "TokenExpiredError":
          return res.status(400).json({
            errors: {
              message: "Authentication Token Expired."
            }
          });
        case "NotBeforeError":
        case "JsonWebTokenError":
          return res.status(400).json({
            errors: {
              message: "Authentication Token Invalid."
            }
          });
      }
    }

    req.query.accessToken = accessToken;
    req.body.tokenData = decoded;

    next();
  });
};

export default auth;
