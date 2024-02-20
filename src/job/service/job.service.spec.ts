import { randomUUID } from "crypto";
import { JobStatus } from "../enum/jobStatus.enum";
import { JobDTO } from "../controller/dto/job.dto";
import { jobRepository } from "../repository/job.repository";
import { jobService } from "./job.service";
import { JobEditDTO } from "../controller/dto/job-edit.dto";
import { JobEntity } from "../entity/job.entity";

describe("jobRepository", () => {
  const defaultJobDto: JobEntity = {
    id: randomUUID(),
    status: JobStatus.DRAFT,
    company_id: "fc716304-f34c-4115-8bc2-e03a201086f0",
    title: "Software Engineer",
    description: "Developing web applications",
    location: "San Francisco, CA",
    notes: "Interview scheduled for next week",
    created_at: "",
    updated_at: "",
  };

  it("Should return one draft Job", async () => {
    jest.spyOn(jobRepository, "createJobDraft").mockImplementation(() => {
      return Promise.resolve(defaultJobDto);
    });
    const jobCreation: JobDTO = {
      id: "",
      status: JobStatus.DRAFT,
      company_id: "fc716304-f34c-4115-8bc2-e03a201086f0",
      title: "Software Engineer",
      description: "Developing web applications",
      location: "San Francisco, CA",
      notes: "Interview scheduled for next week",
    };

    const response = await jobService.createJobDraft(jobCreation);
    expect(response).toMatchObject(defaultJobDto);

    expect(jobRepository.createJobDraft).toBeCalledTimes(1);
  });

  it("Should return one Job published", async () => {
    const publishedJob: JobEntity = defaultJobDto as JobEntity;
    publishedJob.status = JobStatus.PUBLISHED;
    jest.spyOn(jobRepository, "updateJobStatusById").mockImplementation(() => {
      return Promise.resolve(publishedJob);
    });

    const response = await jobService.putPublishDraftJobById(randomUUID());
    expect(response).toMatchObject(defaultJobDto);
    expect(response.status).toMatch(JobStatus.PUBLISHED);

    expect(jobRepository.updateJobStatusById).toBeCalledTimes(1);
  });

  it("Should return one Job archived", async () => {
    const archivedJob: JobEntity = {
      ...defaultJobDto,
    };
    archivedJob.status = JobStatus.ARCHIVED;
    jest.spyOn(jobRepository, "putArchiveJobPosting").mockImplementation(() => {
      return Promise.resolve(archivedJob);
    });

    const response = await jobService.putArchiveJobPosting(randomUUID());
    expect(response).toMatchObject(defaultJobDto);
    expect(response.status).toMatch(JobStatus.ARCHIVED);

    expect(jobRepository.putArchiveJobPosting).toBeCalledTimes(1);
  });

  it("Should edit a Job", async () => {
    const editedJob: JobEditDTO = {
      title: "Software Engineer Edited",
      description: "Developing web applications Edited",
      location: "San Francisco, CA",
    };
    const jobEditedDto: JobEntity = {
      ...defaultJobDto,
      ...editedJob,
    };

    jest.spyOn(jobRepository, "putEditJob").mockImplementation(() => {
      return Promise.resolve(jobEditedDto);
    });

    const response = await jobService.putEditJob(randomUUID(), jobEditedDto);
    expect(response).toMatchObject(jobEditedDto);

    expect(jobRepository.putEditJob).toBeCalledTimes(1);
  });
});
