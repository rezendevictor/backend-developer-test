import { JobStatus } from "../enum/jobStatus.enum";

export interface JobEntity {
  id: string;
  company_id: string;
  title: string;
  description: string;
  location: string;
  notes: string;
  status: JobStatus;

  created_at: string;

  updated_at: string;
}
