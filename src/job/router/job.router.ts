import express, { NextFunction, Response, Router } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { jobController } from "../controller/job.controller";
import {
  createNewJobSchema,
  postJobSchema,
} from "../schema/post-new-job.schema";
import { validator } from "../../core/express-validation";
import {
  jobByIdParamJoiSchema,
  jobByIdParamSchema,
} from "../schema/job-by-id-param.schema";
import { editJobJoiSchema, editJobSchema } from "../schema/put-edit-job.schema";
import { jobsErrorHandler } from "../error/job-error.handler";
import { JobResponseDTO } from "../controller/dto/job-response.dto";

const jobsRouter: Router = express.Router();

jobsRouter.post(
  "/",
  validator.body(postJobSchema),
  (
    req: ValidatedRequest<createNewJobSchema>,
    res: Response<JobResponseDTO>,
    next: NextFunction,
  ) => {
    (async (): Promise<void> => {
      await jobController.createJobDraft(req.body, res).catch(next);
    })().catch(next);
  },
);

jobsRouter.put(
  "/:job_id/publish",
  validator.params(jobByIdParamJoiSchema),
  (
    req: ValidatedRequest<jobByIdParamSchema>,
    res: Response,
    next: NextFunction,
  ) => {
    (async (): Promise<void> => {
      await jobController
        .putPublishDraftJobById(req.params.job_id, res)
        .catch(next);
    })().catch(next);
  },
);
/*
    PUT /job/:job_id: Edit a job posting draft (title, location, description).
 */
jobsRouter.put(
  "/:job_id",
  validator.params(jobByIdParamJoiSchema),
  validator.body(editJobJoiSchema),
  (req: ValidatedRequest<editJobSchema>, res: Response, next: NextFunction) => {
    (async (): Promise<void> => {
      await jobController
        .putEditJob(req.params.job_id, req.body, res)
        .catch(next);
    })().catch(next);
  },
);

jobsRouter.put(
  "/:job_id/archive",
  validator.params(jobByIdParamJoiSchema),
  (
    req: ValidatedRequest<jobByIdParamSchema>,
    res: Response,
    next: NextFunction,
  ) => {
    (async (): Promise<void> => {
      await jobController
        .putArchiveJobPosting(req.params.job_id, res)
        .catch(next);
    })().catch(next);
  },
);

//TODO: Delete is timing out when it works, check later
jobsRouter.delete(
  "/:job_id",
  validator.params(jobByIdParamJoiSchema),
  (
    req: ValidatedRequest<jobByIdParamSchema>,
    res: Response<void>,
    next: NextFunction,
  ) => {
    (async (): Promise<void> => {
      await jobController.deleteJobDraft(req.params.job_id, res).catch(next);
    })().catch(next);
  },
);

jobsRouter.use(jobsErrorHandler);

export { jobsRouter };
