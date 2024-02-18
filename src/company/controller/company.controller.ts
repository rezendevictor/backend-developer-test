import {companyService, CompanyService} from '../service/company.service';
import {Response} from 'express';

export class CompanyController {
    constructor(
        private readonly companyService: CompanyService,
    ) {}

    public async getCompanies(res : Response) : Promise<void>{
        const companies = await this.companyService.getCompanies();
        console.log(companies)
        res.json(companies);
        res.status(200);
    }

    public async getCompanyById(id:string, res : Response): Promise<void>{
        const company = await this.companyService.getCompanyById(id)
        res.json(company);
        res.status(200);
    }

}

export const companyController = new CompanyController(companyService)
