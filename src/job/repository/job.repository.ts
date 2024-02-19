import {QueryResult} from 'pg';
import {pool} from '../../core/database/pool.database';
import {JobDTO} from '../controller/dto/job.dto';
import {JobStatus} from '../enum/jobStatus.enum';
import {randomUUID} from 'crypto';

export class JobRepository {
    public async createJobDraft(jobDTO: JobDTO): Promise<JobDTO> {
        const insertQuery = `
              INSERT INTO jobs (id, company_id, title,description,location,notes,status)
              VALUES ($1, $2, $3, $4, $5, $6, $7)
              RETURNING *;`;
        const result : QueryResult<JobDTO> = await pool.query(insertQuery, [
            randomUUID(),
            jobDTO.company_id,
            jobDTO.title,
            jobDTO.description,
            jobDTO.location,
            jobDTO.notes,
            JobStatus.DRAFT
        ]);
        return result.rows[0]
    }

    public async updateJobStatusById(id: string, status : JobStatus) : Promise<JobDTO> {
        const updateQuery = `
        UPDATE jobs 
        SET status = $1 
        WHERE id = $2 and status = $3
        RETURNING *;`;

        const result: QueryResult<JobDTO> = await pool.query(updateQuery, [status, id, JobStatus.DRAFT]);
        return result.rows[0];
    }
}


export const jobRepository = new JobRepository()
