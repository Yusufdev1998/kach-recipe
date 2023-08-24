import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/user.model";

class UserController {
  model;
  constructor() {
    this.model = userModel;
  }
  async signUp(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const hasUser = await userModel.findOne({ username });

      if (hasUser) {
        return res.status(409).send({ errors: ["Username doesn't exist!"] });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({
        username,
        password: hashedPassword,
      });
      const accessToken = jwt.sign(
        { user_id: user._id },
        process.env.TOKEN_SECRET as string,
        { expiresIn: "1d" }
      );
      return res.json({
        username: user.username,
        accessToken,
      });
    } catch (error: any) {
      return res.status(400).send({ errors: [error.message] });
    }
  }

  async logIn(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const user = await userModel.findOne({ username });

      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const accessToken = jwt.sign(
            { user_id: user._id },
            process.env.TOKEN_SECRET as string,
            { expiresIn: "1d" }
          );
          return res.json({
            username: user.username,
            accessToken,
          });
        } else throw new Error("Password is wrong!");
      } else throw new Error("Username could not be found!");
    } catch (error: any) {
      return res.status(400).send({ errors: [error.message] });
    }
  }
}

export default UserController;
