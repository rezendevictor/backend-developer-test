import dotenv from "dotenv";
import express, { Application } from "express";
import { companyRouter } from "./company/router/company.router";
import { jobsRouter } from "./job/router/job.router";
import { generalErrorHandler } from "./core/error/joi-error.handler";

dotenv.config();

const app: Application = express();
app.use(express.json());

app.use("/companies", companyRouter);
app.use("/jobs", jobsRouter);

app.use(generalErrorHandler);
export default app;
