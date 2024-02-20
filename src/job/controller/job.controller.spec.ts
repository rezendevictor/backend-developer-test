import { randomUUID } from "crypto";
import { Response } from "express";
import { JobDTO } from "./dto/job.dto";
import { JobStatus } from "../enum/jobStatus.enum";
import { jobService } from "../service/job.service";
import { jobController } from "./job.controller";
import { JobResponseDTO } from "./dto/job-response.dto";
import { JobEditDTO } from "./dto/job-edit.dto";

describe("JobContoller", () => {
  const defaultJobDto: JobDTO = {
    id: randomUUID(),
    status: JobStatus.DRAFT,
    company_id: "fc716304-f34c-4115-8bc2-e03a201086f0",
    title: "Software Engineer",
    description: "Developing web applications",
    location: "San Francisco, CA",
    notes: "Interview scheduled for next week",
  };

  it("Should return one draft Job", async () => {
    const statusMethod = jest.fn((x) => x);
    const jsonMethod = jest.fn((x) => x);

    jest.spyOn(jobService, "createJobDraft").mockImplementation(() => {
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

    await jobController.createJobDraft(jobCreation, {
      json: jsonMethod as unknown as (body: unknown) => Response,
      status: statusMethod as unknown as (statusCode: number) => Response,
    } as Response<JobResponseDTO>);
    expect(jsonMethod.mock.calls[0][0]).toMatchObject(defaultJobDto);

    expect(jobService.createJobDraft).toBeCalledTimes(1);
  });

  it("Should return one Job published", async () => {
    const statusMethod = jest.fn((x) => x);
    const jsonMethod = jest.fn((x) => x);
    const publishedJob = defaultJobDto;
    publishedJob.status = JobStatus.PUBLISHED;
    jest.spyOn(jobService, "putPublishDraftJobById").mockImplementation(() => {
      return Promise.resolve(publishedJob);
    });

    await jobController.putPublishDraftJobById(randomUUID(), {
      json: jsonMethod as unknown as (body: unknown) => Response,
      status: statusMethod as unknown as (statusCode: number) => Response,
    } as Response<JobResponseDTO>);
    const response: JobResponseDTO = jsonMethod.mock.calls[0][0];
    expect(jsonMethod.mock.calls[0][0]).toMatchObject(defaultJobDto);
    expect(response.status).toMatch(JobStatus.PUBLISHED);

    expect(jobService.putPublishDraftJobById).toBeCalledTimes(1);
  });

  it("Should return one Job archived", async () => {
    const statusMethod = jest.fn((x) => x);
    const jsonMethod = jest.fn((x) => x);
    const archivedJob = defaultJobDto;
    archivedJob.status = JobStatus.ARCHIVED;
    jest.spyOn(jobService, "putArchiveJobPosting").mockImplementation(() => {
      return Promise.resolve(archivedJob);
    });

    await jobController.putArchiveJobPosting(randomUUID(), {
      json: jsonMethod as unknown as (body: unknown) => Response,
      status: statusMethod as unknown as (statusCode: number) => Response,
    } as Response<JobResponseDTO>);
    const response: JobResponseDTO = jsonMethod.mock.calls[0][0];
    expect(jsonMethod.mock.calls[0][0]).toMatchObject(defaultJobDto);
    expect(response.status).toMatch(JobStatus.ARCHIVED);

    expect(jobService.putArchiveJobPosting).toBeCalledTimes(1);
  });

  it("Should edit a Job", async () => {
    const statusMethod = jest.fn((x) => x);
    const jsonMethod = jest.fn((x) => x);
    const editedJob: JobEditDTO = {
      title: "Software Engineer Edited",
      description: "Developing web applications Edited",
      location: "San Francisco, CA",
    };
    const jobEditedDto: JobDTO = {
      ...defaultJobDto,
      ...editedJob,
    };

    jest.spyOn(jobService, "putEditJob").mockImplementation(() => {
      return Promise.resolve(jobEditedDto);
    });

    await jobController.putEditJob(randomUUID(), jobEditedDto, {
      json: jsonMethod as unknown as (body: unknown) => Response,
      status: statusMethod as unknown as (statusCode: number) => Response,
    } as Response<JobResponseDTO>);
    expect(jsonMethod.mock.calls[0][0]).toMatchObject(jobEditedDto);

    expect(jobService.putEditJob).toBeCalledTimes(1);
  });
});
