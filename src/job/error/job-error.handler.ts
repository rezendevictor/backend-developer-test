import { NextFunction, Request, Response } from "express";
import { JobNotFoundError } from "./job-not-found.error";

export function jobsErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  caseJobNorFoundError(err, req, res);
  next(err);
}

function caseJobNorFoundError(err: unknown, req: Request, res: Response): void {
  if (err instanceof JobNotFoundError) {
    const statusCode = 404;
    const response = {
      status: statusCode,
      message: err.message,
    };
    res.status(statusCode);
    res.json(response);
  }
}
