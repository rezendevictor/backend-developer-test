import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import express, { NextFunction, Response, Router } from "express";
import { pool } from "../../core/database/pool.database";
import { JobStatus } from "../../job/enum/jobStatus.enum";
import * as fs from "fs";
import { ValidatedRequest } from "express-joi-validation";
import { s3BucketService } from "./s3bucket.service";

const s3 = new S3Client({
  region: "eu-north-1",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "job-feed-bucket",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});
const bucketRouter: Router = express.Router();

bucketRouter.post(
  "/upload",
  upload.array("jobs", 3),
  function (req, res, next) {
    // @ts-ignore
    res.send("Successfully uploaded " + req.files.length + " files!");
  },
);

bucketRouter.post(
  "/upload/internal",
  upload.array("jobs", 3),
  function (req, res, next) {
    // @ts-ignore
    res.send("Successfully uploaded " + req.files.length + " files!");
  },
);

bucketRouter.get(
  "/feed",
  (req: ValidatedRequest<any>, res: Response<void>, next: NextFunction) => {
    (async (): Promise<void> => {
      await s3BucketService.getFeed(res);
    })().catch(next);
  },
);

bucketRouter.post(
  "/file",
  (req: ValidatedRequest<any>, res: Response<void>, next: NextFunction) => {
    (async (): Promise<void> => {
      uploadPublishedJobs(req, res);
      res.status(200);
      res.json();
    })().catch(next);
  },
);
async function uploadPublishedJobs(req: ValidatedRequest<any>, res: Response) {
  const allJobs = await pool.query("SELECT * FROM jobs WHERE status = $1", [
    JobStatus.PUBLISHED,
  ]);

  let jobsJson = JSON.stringify(allJobs.rows);

  fs.writeFile("jobs.json", jobsJson, (err) => {
    if (err) {
      console.log("Error writing file:", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
}
export { bucketRouter };
