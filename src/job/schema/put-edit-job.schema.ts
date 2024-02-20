import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import * as Joi from "joi";

export interface editJobSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    title: string;
    description: string;
    location: string;
  };
}

export const editJobJoiSchema: Joi.ObjectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
});
