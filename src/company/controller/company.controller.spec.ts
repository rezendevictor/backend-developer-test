import {randomUUID} from 'crypto';
import {ValidatedRequest, ValidatedRequestSchema} from 'express-joi-validation';
import {CompanyDTO} from './dto/company.dto';
import {companyService} from '../service/company.service';
import {companyController} from './company.controller';
import {CompanyListResponseDTO, CompanyResponseDTO} from './dto/company-response.dto';
import {Response} from 'express';

describe('CompanyContoller', () => {
    const defaultId = randomUUID();

    const defaultValidRequest = {
        params: { id: defaultId },
    } as ValidatedRequest<ValidatedRequestSchema>;


    it('Should return one company by id', async () => {

        const statusMethod = jest.fn((x) => x);
        const jsonMethod = jest.fn((x) => x);

        const companyDTO: CompanyDTO = {
            name: 'company name',
            created_at: '',
            updated_at: '',
            id: "fc716304-f34c-4115-8bc2-e03a201086f0",
        };



        jest.spyOn(
            companyService,
            'getCompanyById'
        ).mockImplementation(() => {
            return Promise.resolve(companyDTO);
        });

        await companyController.getCompanyById(
            randomUUID(),
            {
                json: jsonMethod as unknown as (body: unknown) => Response,
                status: statusMethod as unknown as (statusCode: number) => Response,
            } as Response<CompanyResponseDTO>
        );
        expect(jsonMethod.mock.calls[0][0]).toMatchObject(companyDTO);

        expect(
            companyService.getCompanyById,
        ).toBeCalledTimes(1);
    });

    it('Should return list of companies by id', async () => {

        const statusMethod = jest.fn((x) => x);
        const jsonMethod = jest.fn((x) => x);

        const companyDTO: CompanyDTO = {
            name: 'company name',
            created_at: '',
            updated_at: '',
            id: "fc716304-f34c-4115-8bc2-e03a201086f0",
        };
        const companyDTO2: CompanyDTO = {
            name: 'company name 2',
            created_at: '',
            updated_at: '',
            id: "fc716304-f34c-4115-8bc2-e03a201086f1",
        };

        jest.spyOn(
            companyService,
            'getCompanies'
        ).mockImplementation(() => {
            return Promise.resolve([companyDTO,companyDTO2]);
        });

        await companyController.getCompanies(
            {
                json: jsonMethod as unknown as (body: unknown) => Response,
                status: statusMethod as unknown as (statusCode: number) => Response,
            } as Response<CompanyListResponseDTO>
        );
        expect(jsonMethod.mock.calls[0][0]).toMatchObject({companies : [companyDTO,companyDTO2]});

        expect(
            companyService.getCompanies,
        ).toBeCalledTimes(1);
    });
});
