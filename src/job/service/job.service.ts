import { JobDTO } from "../controller/dto/job.dto";
import { jobRepository, JobRepository } from "../repository/job.repository";
import { JobStatus } from "../enum/jobStatus.enum";
import { JobEditDTO } from "../controller/dto/job-edit.dto";
import { JobNotFoundError } from "../error/job-not-found.error";

export class JobService {
  constructor(private readonly jobRepository: JobRepository) {}

  public async createJobDraft(jobDTO: JobDTO): Promise<JobDTO> {
    return this.jobRepository.createJobDraft(jobDTO);
  }

  async putPublishDraftJobById(id: string): Promise<JobDTO> {
    const job = await this.jobRepository.updateJobStatusById(
      id,
      JobStatus.PUBLISHED,
    );
    if (!job) {
      throw new JobNotFoundError("Job not Found");
    }
    return job;
  }

  async deleteJobDraft(id: string): Promise<void> {
    const job = await this.jobRepository.deleteJobByStatusAndId(id);
    if (!job) {
      throw new JobNotFoundError("Job not Found");
    }
  }

  async putArchiveJobPosting(id: string): Promise<JobDTO> {
    const job = await this.jobRepository.putArchiveJobPosting(id);
    if (!job) {
      throw new JobNotFoundError("Job not Found");
    }
    return job;
  }

  async putEditJob(id: string, jobEdit: JobEditDTO): Promise<JobDTO> {
    const job = await this.jobRepository.putEditJob(id, jobEdit);
    if (!job) {
      throw new JobNotFoundError("Job not Found");
    }
    return job;
  }
}

export const jobService = new JobService(jobRepository);
