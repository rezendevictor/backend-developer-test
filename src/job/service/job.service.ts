import {JobDTO} from '../controller/dto/job.dto';
import {jobRepository, JobRepository} from '../repository/job.repository';
import {JobStatus} from '../enum/jobStatus.enum';

export class JobService {
    constructor(
        private readonly jobRepository: JobRepository,
    ) {
    }

    public async createJobDraft(jobDTO: JobDTO): Promise<JobDTO> {
        return this.jobRepository.createJobDraft(jobDTO);
    }

    async putPublishDraftJobById(id: string) : Promise<JobDTO> {
        const job = await this.jobRepository.updateJobStatusById(id, JobStatus.PUBLISHED);
        if(!job){
            throw new Error("Job not Found");
        }
        return job;
    }
}

export const jobService = new JobService(jobRepository)
