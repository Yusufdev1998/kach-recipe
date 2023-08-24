import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface customRequest extends Request {
  user_id: string;
}

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] as string;
    const verified = jwt.verify(token, process.env.TOKEN_SECRET as string);
    (req as customRequest).user_id = (verified as { user_id: string }).user_id;
    next();
  } catch (error) {
    res.status(403).json({ message: "Authentication failed!" });
  }
};
