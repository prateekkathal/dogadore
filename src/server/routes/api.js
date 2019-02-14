import { Router } from "express";
import authRouter from "./api/auth";
import likeRouter from "./api/like";
import { APP_URL } from "babel-dotenv";

const apiRouter = Router();

/**
 * Cors
 */
const cors = require("cors");
var whitelist = [APP_URL, APP_URL + ":3009", APP_URL + ":1234"];

var corsOptions = {
  origin: function(origin, callback) {
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
apiRouter.use(cors(corsOptions));

/**
 * Body Parse
 */
var bodyParser = require("body-parser");
apiRouter.use(bodyParser.json());

/**
 * Routes
 */
apiRouter.get("/", (req, res) => {
  if (!req.is("application/json")) {
    return res.status(400).json({
      errors: {
        message: "Bad Request"
      }
    });
  }
  res.status(200).json({ message: "Connected!" });
});
apiRouter.use("/", authRouter);
apiRouter.use("/likes", likeRouter);

export default apiRouter;
