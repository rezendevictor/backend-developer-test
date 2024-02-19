import {JobStatus} from '../../enum/jobStatus.enum';
import {JobDTO} from './job.dto';

export interface JobResponseDTO {
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

export function jobDTOtoJobResponseDTO(jobDTO : JobDTO) {


}
