import express, { NextFunction, Response, Router } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { companyController } from "../controller/company.controller";
import {
  GetCompanyByIdSchema,
  getCompanySchema,
} from "../schema/get-company-by-id.schema";
import { validator } from "../../core/express-validation";
import {
  CompanyListResponseDTO,
  CompanyResponseDTO,
} from "../controller/dto/company-response.dto";
import { companyErrorHandler } from "../error/company-error.handler";

const companyRouter: Router = express.Router();

companyRouter.get(
  "/",
  (
    req: ValidatedRequest<any>,
    res: Response<CompanyListResponseDTO>,
    next: NextFunction,
  ) => {
    (async (): Promise<void> => {
      await companyController.getCompanies(res).catch(next);
    })().catch(next);
  },
);

companyRouter.get(
  "/:id",
  validator.params(getCompanySchema),
  (
    req: ValidatedRequest<GetCompanyByIdSchema>,
    res: Response<CompanyResponseDTO>,
    next: NextFunction,
  ) => {
    (async (): Promise<void> => {
      await companyController
        .getCompanyById(req.params.id.toLowerCase(), res)
        .catch(next);
    })().catch(next);
  },
);

companyRouter.use(companyErrorHandler);

export { companyRouter };
