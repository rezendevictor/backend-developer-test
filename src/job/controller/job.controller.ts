import {Response} from 'express';
import {JobService, jobService} from '../service/job.service';
import {JobDTO} from './dto/job.dto';

class JobController {
    constructor(
        private readonly jobService: JobService,
    ) {
    }

    public async createJobDraft(jobDTO: JobDTO, res: Response) : Promise<void>{
        const createdJob = await this.jobService.createJobDraft(jobDTO);
        res.json(createdJob)
        res.status(201)

    }

    public async putPublishDraftJobById(id : string, res: Response) : Promise<void> {
        const job = await this.jobService.putPublishDraftJobById(id);
        res.json(job)
        res.status(200)
    }
}

export const jobController = new JobController(jobService)
