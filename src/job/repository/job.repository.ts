import {QueryResult} from 'pg';
import {pool} from '../../core/database/pool.database';
import {JobDTO} from '../controller/dto/job.dto';
import {JobStatus} from '../enum/jobStatus.enum';
import {randomUUID} from 'crypto';
import {JobEditDTO} from '../controller/dto/job-edit.dto';
import {JobEntity} from '../entity/job.entity';

export class JobRepository {

    public async createJobDraft(JobEntity: JobDTO): Promise<JobEntity> {
        const insertQuery = `
              INSERT INTO jobs (id, company_id, title,description,location,notes,status)
              VALUES ($1, $2, $3, $4, $5, $6, $7)
              RETURNING *;`;
        const result : QueryResult<JobEntity> = await pool.query(insertQuery, [
            randomUUID(),
            JobEntity.company_id,
            JobEntity.title,
            JobEntity.description,
            JobEntity.location,
            JobEntity.notes,
            JobStatus.DRAFT
        ]);
        return result.rows[0]
    }

    public async updateJobStatusById(id: string, status : JobStatus) : Promise<JobEntity> {
        return this.updateQueryByIdAndStatus(status,id,JobStatus.DRAFT);
    }
    public async putArchiveJobPosting(id: string){
        return this.updateQueryByIdAndStatus(JobStatus.ARCHIVED, id,JobStatus.PUBLISHED);
    }

    public async updateQueryByIdAndStatus(statusToSet : JobStatus, id : string, statusToSearch : JobStatus  ){
        const updateQuery = `
        UPDATE jobs 
        SET status = $1 
        WHERE id = $2 and status = $3
        RETURNING *;`;

        const result: QueryResult<JobEntity> = await pool.query(updateQuery, [statusToSet, id, statusToSearch]);
        return result.rows[0];
    }

    async deleteJobByStatusAndId(id: string) : Promise<JobEntity>{
        const deleteQuery = `
        DELETE FROM jobs 
        WHERE id = $1 and status = $2
        RETURNING *;`;
        const result: QueryResult<JobEntity> = await pool.query(deleteQuery, [ id, JobStatus.DRAFT]);
        return result.rows[0];
    }

    async putEditJob(id: string, jobEdit: JobEditDTO) : Promise<JobEntity> {
        const updateQuery = `
        UPDATE jobs 
        SET title = $1,description = $2 ,location = $3
        WHERE id = $4 
        RETURNING *;`;

        const result: QueryResult<JobEntity> = await pool.query(updateQuery, [
            jobEdit.title,
            jobEdit.description,
            jobEdit.location,
            id
        ]);
        return result.rows[0];
    }
}


export const jobRepository = new JobRepository()
