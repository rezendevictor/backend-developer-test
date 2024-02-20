import {NextFunction, Request, Response} from 'express';
import {CompanyNotFoundError} from './company-not-found.error';

export function companyErrorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    caseCompanyNotFoundError(err, req, res);
    next(err);
}

function caseCompanyNotFoundError(
    err: unknown,
    req: Request,
    res: Response,
): void {
    if (err instanceof CompanyNotFoundError) {
        const statusCode = 404;
        const response = {
            status: statusCode,
            message: err.message,
        };
        res.status(statusCode);
        res.json(response);
    }
}
