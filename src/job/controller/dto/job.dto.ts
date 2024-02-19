import {JobStatus} from '../../enum/jobStatus.enum';

export interface JobDTO {
    id: string;
    company_id: string;
    title: string;
    description: string;
    location: string;
    notes: string;
    status: JobStatus;

}
