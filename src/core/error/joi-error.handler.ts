import { NextFunction, Request, Response } from "express";
import { ExpressJoiError } from "express-joi-validation";

export function generalErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  caseJoiError(err, req, res);
  next(err);
}

function caseJoiError(err: unknown, req: Request, res: Response): void {
  if (
    err &&
    // @ts-ignore
    err?.error instanceof Error &&
    // @ts-ignore
    err?.error?.name === "ValidationError"
  ) {
    const e: ExpressJoiError = err as ExpressJoiError;
    const joiError = e.error;
    if (joiError) {
      const statusCode = 400;
      const response = {
        status: statusCode,
        message: joiError.message,
      };
      res.status(statusCode);
      res.json(response);
    }
  }
}
