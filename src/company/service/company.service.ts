import {companyRepository, CompanyRepository} from '../repository/company.repository';

export class CompanyService {
    constructor(
        private readonly companyRepository: CompanyRepository,
    ) {
    }

    public async getCompanies(): Promise<any> {
        return this.companyRepository.getCompanies();
    }

    public async getCompanyById(id: string): Promise<any> {
        return this.companyRepository.getCompanyById(id);
    }
}

export const companyService = new CompanyService(companyRepository)
