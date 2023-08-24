"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
class UserController {
    constructor() {
        this.model = user_model_1.default;
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const hasUser = yield user_model_1.default.findOne({ username });
                if (hasUser) {
                    return res.status(409).send({ errors: ["Username doesn't exist!"] });
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const user = yield user_model_1.default.create({
                    username,
                    password: hashedPassword,
                });
                const accessToken = jsonwebtoken_1.default.sign({ user_id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
                return res.json({
                    username: user.username,
                    accessToken,
                });
            }
            catch (error) {
                return res.status(400).send({ errors: [error.message] });
            }
        });
    }
    logIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const user = yield user_model_1.default.findOne({ username });
                if (user) {
                    const match = yield bcrypt_1.default.compare(password, user.password);
                    if (match) {
                        const accessToken = jsonwebtoken_1.default.sign({ user_id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
                        return res.json({
                            username: user.username,
                            accessToken,
                        });
                    }
                    else
                        throw new Error("Password is wrong!");
                }
                else
                    throw new Error("Username could not be found!");
            }
            catch (error) {
                return res.status(400).send({ errors: [error.message] });
            }
        });
    }
}
exports.default = UserController;
