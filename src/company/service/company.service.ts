import {companyRepository, CompanyRepository} from '../repository/company.repository';
import {CompanyNotFoundError} from '../error/company-not-found.error';

export class CompanyService {
    constructor(
        private readonly companyRepository: CompanyRepository,
    ) {
    }

    public async getCompanies(): Promise<any> {
        return this.companyRepository.getCompanies();
    }

    public async getCompanyById(id: string): Promise<any> {
        const company = this.companyRepository.getCompanyById(id);
        if(!company){
            throw new CompanyNotFoundError("Company not Found");
        }
    }
}

export const companyService = new CompanyService(companyRepository)
