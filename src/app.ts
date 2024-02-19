import dotenv from 'dotenv';
import express, {Application} from 'express';
import {companyRouter} from './company/router/company.router';
import {jobsRouter} from './job/router/job.router';

dotenv.config();

const app: Application = express();
app.use(express.json());

app.use('/companies', companyRouter);
app.use('/jobs', jobsRouter);

export default app;
