"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const validationMiddle_1 = __importDefault(require("../middleware/validationMiddle"));
const userRouter = (0, express_1.Router)();
const Controller = new user_controller_1.default();
userRouter.post("/signup", (0, express_validator_1.body)("username").notEmpty().withMessage("Username bo'sh bo'lmasin!"), (0, express_validator_1.body)("password")
    .notEmpty()
    .isLength({ min: 6, max: 12 })
    .withMessage("Password bo'sh bo'lmasin!, uzunligi 6 va 12 belgi orasida bo'lsin!"), validationMiddle_1.default, Controller.signUp);
userRouter.post("/login", (0, express_validator_1.body)("username").notEmpty().withMessage("Username bo'sh bo'lmasin!"), (0, express_validator_1.body)("password")
    .notEmpty()
    .isLength({ min: 6, max: 12 })
    .withMessage("Password bo'sh bo'lmasin!, uzunligi 6 va 12 belgi orasida bo'lsin!"), validationMiddle_1.default, Controller.logIn);
exports.default = userRouter;
