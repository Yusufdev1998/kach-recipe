import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export default (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    next();
  } else {
    res.status(400).json({ errors: result.array().map(err => err.msg) });
  }
};
