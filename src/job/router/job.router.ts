/*
    POST /job: Create a job posting draft.
    PUT /job/:job_id/publish: Publish a job posting draft.
    PUT /job/:job_id: Edit a job posting draft (title, location, description).
    DELETE /job/:job_id: Delete a job posting draft.
    PUT /job/:job_id/archive: Archive an active job posting.
 */

import express, {NextFunction, Response, Router} from 'express';
import {ValidatedRequest} from 'express-joi-validation';
import {jobController} from '../controller/job.controller';
import {createNewJobSchema, postJobSchema} from '../../company/schema/post-new-job.schema';
import {validator} from '../../core/express-validation';
import {putPublishDraftJoiSchema, putPublishDraftSchema} from '../../company/schema/put-publish-draft.schema';

const jobsRouter: Router = express.Router();

jobsRouter.post(
    '/',
    validator.body(postJobSchema),
    (
        req: ValidatedRequest<createNewJobSchema>,
        res: Response,
        next: NextFunction,
    ) => {
        (async (): Promise<void> => {
                await jobController
                    .createJobDraft(req.body, res)
                    .catch(next);
        })().catch(next);

    },
);

jobsRouter.put(
    '/:job_id/publish',
    validator.params(putPublishDraftJoiSchema),
    (
        req: ValidatedRequest<putPublishDraftSchema>,
        res: Response,
        next: NextFunction,
    ) => {
        (async (): Promise<void> => {
            await jobController
                .putPublishDraftJobById(req.params.job_id, res)
        })().catch(next);

    },
);
/*
jobsRouter.put(
    (
        req: ValidatedRequest<any>,
        res: Response<CompanyListResponseDTO>,
        next: NextFunction,
    ) => {
        (async (): Promise<void> => {
            await companyController
                .getCompanies(res)
                .catch(next);
        })().catch(next);

    },
);

jobsRouter.put(
    '/:job_id/',
    (
        req: ValidatedRequest<any>,
        res: Response<CompanyListResponseDTO>,
        next: NextFunction,
    ) => {
        (async (): Promise<void> => {
            await companyController
                .getCompanies(res)
                .catch(next);
        })().catch(next);

    },
);

 */

export {jobsRouter};

