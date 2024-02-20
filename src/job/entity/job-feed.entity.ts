import { JobEntity } from "./job.entity";

// job ID, title, description, company name and the date when the job was created
export interface JobFeedEntity {
  id: string;
  company_id: string;
  title: string;
  description: string;
  location: string;
  published_date: string;
}

export function jobEntityToJobFeedDTO(jobEntity: JobEntity) {
  return {
    id: jobEntity.id,
    company_id: jobEntity.company_id,
    title: jobEntity.title,
    description: jobEntity.description,
    location: jobEntity.location,
    published_date: jobEntity.created_at,
  };
}
