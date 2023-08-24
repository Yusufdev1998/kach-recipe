import { Router } from "express";
import { body } from "express-validator";
import UserController from "../controllers/user.controller";
import validationMiddle from "../middleware/validationMiddle";

const userRouter = Router();

const Controller = new UserController();

userRouter.post(
  "/signup",
  body("username").notEmpty().withMessage("Username bo'sh bo'lmasin!"),
  body("password")
    .notEmpty()
    .isLength({ min: 6, max: 12 })
    .withMessage(
      "Password bo'sh bo'lmasin!, uzunligi 6 va 12 belgi orasida bo'lsin!"
    ),
  validationMiddle,
  Controller.signUp
);

userRouter.post(
  "/login",
  body("username").notEmpty().withMessage("Username bo'sh bo'lmasin!"),
  body("password")
    .notEmpty()
    .isLength({ min: 6, max: 12 })
    .withMessage(
      "Password bo'sh bo'lmasin!, uzunligi 6 va 12 belgi orasida bo'lsin!"
    ),
  validationMiddle,
  Controller.logIn
);

export default userRouter;
