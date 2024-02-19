import {JobStatus} from '../enum/jobStatus.enum';
import {JobDTO} from '../controller/dto/job.dto';

export interface JobEntity {
    id: string;
    company_id: string;
    title: string;
    description: string;
    location: string;
    notes: string;
    status: JobStatus;
}

export function jobDTOtoJobResponseDTO(jobDTO : JobDTO) {

    return {
        id: jobDTO.id,
        company_id: jobDTO.company_id,
        title: jobDTO.title,
        description: jobDTO.description,
        location: jobDTO.location,
        notes: jobDTO.notes,
        status: jobDTO.status,
    }


}
