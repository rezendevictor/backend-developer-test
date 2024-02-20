import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import * as Joi from "joi";

export interface GetCompanyByIdSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: { id: string };
}

export const getCompanySchema: Joi.ObjectSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
