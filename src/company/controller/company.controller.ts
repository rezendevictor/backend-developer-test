import { companyService, CompanyService } from "../service/company.service";
import { Response } from "express";
import {
  companyDtoListToCompanyListResponseDto,
  companyDtoToCompanyResponseDto,
  CompanyListResponseDTO,
  CompanyResponseDTO,
} from "./dto/company-response.dto";

export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  public async getCompanies(
    res: Response<CompanyListResponseDTO>,
  ): Promise<void> {
    const companies = await this.companyService.getCompanies();
    res.json(companyDtoListToCompanyListResponseDto(companies));
    res.status(200);
  }

  public async getCompanyById(
    id: string,
    res: Response<CompanyResponseDTO>,
  ): Promise<void> {
    const company = await this.companyService.getCompanyById(id);
    res.json(companyDtoToCompanyResponseDto(company));
    res.status(200);
  }
}

export const companyController = new CompanyController(companyService);
