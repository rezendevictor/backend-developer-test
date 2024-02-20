import { randomUUID } from "crypto";
import { companyRepository } from "../repository/company.repository";
import { CompanyDTO } from "../controller/dto/company.dto";
import { companyService } from "./company.service";

describe("CompanyService", () => {
  const defaultId = randomUUID();

  it("Should return one company by id", async () => {
    const companyDTO: CompanyDTO = {
      name: "company name",
      created_at: "",
      updated_at: "",
      id: "fc716304-f34c-4115-8bc2-e03a201086f0",
    };

    jest.spyOn(companyRepository, "getCompanyById").mockImplementation(() => {
      return Promise.resolve(companyDTO);
    });

    const result = await companyService.getCompanyById(randomUUID());
    expect(result).toMatchObject(companyDTO);

    expect(companyRepository.getCompanyById).toBeCalledTimes(1);
  });
  it("Should return company array", async () => {
    const companyDTO: CompanyDTO = {
      name: "company name",
      created_at: "",
      updated_at: "",
      id: "fc716304-f34c-4115-8bc2-e03a201086f0",
    };

    const companyDTO2: CompanyDTO = {
      name: "company name 2",
      created_at: "",
      updated_at: "",
      id: "fc716304-f34c-4115-8bc2-e03a201086f1",
    };

    jest.spyOn(companyRepository, "getCompanies").mockImplementation(() => {
      return Promise.resolve([companyDTO, companyDTO2]);
    });

    const result = await companyService.getCompanies();
    expect(result).toMatchObject([companyDTO, companyDTO2]);

    expect(companyRepository.getCompanies).toBeCalledTimes(1);
  });
});
