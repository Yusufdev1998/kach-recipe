import { Router } from "express";
import { body } from "express-validator";
import UserController from "../controllers/user.controller";
import validationMiddle from "../middleware/validationMiddle";

const userRouter = Router();

const Controller = new UserController();

userRouter.post(
  "/signup",
  body("username").notEmpty().withMessage("Username cannot be empty!"),
  body("password")
    .notEmpty()
    .isLength({ min: 6, max: 12 })
    .withMessage("Password field must be between 6 and 12 characters!"),
  validationMiddle,
  Controller.signUp
);

userRouter.post(
  "/login",
  body("username").notEmpty().withMessage("Username cannot be empty!"),
  body("password")
    .notEmpty()
    .isLength({ min: 6, max: 12 })
    .withMessage("Password field must be between 6 and 12 characters!"),
  validationMiddle,
  Controller.logIn
);

export default userRouter;
