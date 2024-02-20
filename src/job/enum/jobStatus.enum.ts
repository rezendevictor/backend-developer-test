export enum JobStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
  REJECTED = "rejected",
}

export const jobStatusEnum = Object.keys(JobStatus);
