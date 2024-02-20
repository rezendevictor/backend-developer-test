import { QueryResult } from "pg";
import { pool } from "../../core/database/pool.database";
import { CompanyDTO } from "../controller/dto/company.dto";

export class CompanyRepository {
  public async getCompanies(): Promise<any> {
    const result: QueryResult<CompanyDTO[]> = await pool.query(
      "SELECT * FROM companies",
    );
    return result.rows;
  }

  public async getCompanyById(id: string): Promise<any> {
    const result: QueryResult<CompanyDTO[]> = await pool.query(
      "SELECT * FROM companies WHERE id = $1 limit 1",
      [id],
    );
    return result.rows[0];
  }
}

export const companyRepository = new CompanyRepository();
