import { Router } from "express";
import { login, signUp, logout, me } from "./../../controllers/authController";
import auth from "../../middlewares/auth";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/sign-up", signUp);
authRouter.get("/logout", logout);
authRouter.get(
  "/me",
  (req, res, next) => {
    auth(req, res, next);
  },
  me
);

export default authRouter;
