import dotenv from 'dotenv';
import express, {Application} from 'express';
import {companyRouter} from './company/router/company.router';

dotenv.config();

const app: Application = express();
app.use(express.json());

app.use('/companies', companyRouter);

export default app;
