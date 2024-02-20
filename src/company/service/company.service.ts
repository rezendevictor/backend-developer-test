import {companyRepository, CompanyRepository} from '../repository/company.repository';
import {CompanyNotFoundError} from '../error/company-not-found.error';
import {CompanyDTO} from '../controller/dto/company.dto';

export class CompanyService {
    constructor(
        private readonly companyRepository: CompanyRepository,
    ) {
    }

    public async getCompanies(): Promise<any> {
        return this.companyRepository.getCompanies();
    }

    public async getCompanyById(id: string): Promise<CompanyDTO> {
        const company = await this.companyRepository.getCompanyById(id);
        if(!company){
            throw new CompanyNotFoundError("Company not Found");
        }
        return company;
    }
}

export const companyService = new CompanyService(companyRepository)
