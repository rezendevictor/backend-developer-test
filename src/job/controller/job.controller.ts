import { Response } from "express";
import { JobService, jobService } from "../service/job.service";
import { JobDTO } from "./dto/job.dto";
import { JobEditDTO } from "./dto/job-edit.dto";
import { jobDTOtoJobResponseDTO } from "../entity/job.entity";

class JobController {
  constructor(private readonly jobService: JobService) {}

  public async createJobDraft(jobDTO: JobDTO, res: Response): Promise<void> {
    const createdJob = await this.jobService.createJobDraft(jobDTO);
    res.json(jobDTOtoJobResponseDTO(createdJob));
    res.status(201);
  }

  public async putPublishDraftJobById(
    id: string,
    res: Response,
  ): Promise<void> {
    const job = await this.jobService.putPublishDraftJobById(id);
    res.json(jobDTOtoJobResponseDTO(job));
    res.status(200);
  }

  public async deleteJobDraft(id: string, res: Response<void>): Promise<void> {
    await this.jobService.deleteJobDraft(id);
    res.status(200);
    res.json();
  }

  async putArchiveJobPosting(id: string, res: Response): Promise<void> {
    const job = await this.jobService.putArchiveJobPosting(id);
    res.json(jobDTOtoJobResponseDTO(job));
    res.status(200);
  }

  async putEditJob(
    id: string,
    jobEdit: JobEditDTO,
    res: Response,
  ): Promise<void> {
    const job = await this.jobService.putEditJob(id, jobEdit);
    res.json(jobDTOtoJobResponseDTO(job));
    res.status(200);
  }
}

export const jobController = new JobController(jobService);
