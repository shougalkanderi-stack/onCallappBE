import { NextFunction, Request, Response } from "express";

const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
};

export default ErrorHandler;
