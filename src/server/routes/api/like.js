import { Router } from "express";
import {
  index as allLikes,
  create as createLike,
  check as checkLike
} from "../../controllers/likeController";
import auth from "../../middlewares/auth";

const likeRouter = Router();

likeRouter.use((req, res, next) => {
  auth(req, res, next);
});
likeRouter.get("/", allLikes);
likeRouter.post("/", createLike);
likeRouter.get("/check", checkLike);

export default likeRouter;
