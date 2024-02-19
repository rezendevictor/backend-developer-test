import {pool} from '../../core/database/pool.database';
import {QueryResult} from 'pg';

export class CompanyService{
    public async getCompanies(): Promise<any> {
        const result : QueryResult = await pool.query('SELECT * FROM companies');
        return result.rows;
    }

    public async getCompanyById(id:string): Promise<any>{
        const result : QueryResult = await pool.query('SELECT * FROM companies WHERE id = $1', [id]);
        return result.rows[0];
    }
}
export const companyService = new CompanyService()
