import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import * as Joi from "joi";
import { JobStatus } from "../enum/jobStatus.enum";

export interface createNewJobSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    id: string;
    company_id: string;
    title: string;
    description: string;
    location: string;
    notes: string;
    status: JobStatus;
  };
}

export const postJobSchema: Joi.ObjectSchema = Joi.object({
  company_id: Joi.string().uuid().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  notes: Joi.string().required(),
});
