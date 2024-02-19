import {ContainerTypes, ValidatedRequestSchema} from 'express-joi-validation';
import * as Joi from 'joi';

export interface putPublishDraftSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: { job_id: string };

}


export const putPublishDraftJoiSchema: Joi.ObjectSchema = Joi.object({
    job_id: Joi.string().uuid().required(),
});
