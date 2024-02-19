import {CompanyDTO} from './company.dto';

export interface CompanyResponseDTO {
    id: string;
    name: string;

    created_at: string;

    updated_at : string;

}

export function companyDtoToCompanyResponseDto(companyDto : CompanyDTO) : CompanyResponseDTO {
    return {
        id: companyDto.id,
        name: companyDto.name,
        created_at : companyDto.created_at,
        updated_at : companyDto.updated_at
    }
}


export interface CompanyListResponseDTO {
    companies : CompanyResponseDTO[]
}

export function companyDtoListToCompanyListResponseDto(companiesList : CompanyDTO[]) : CompanyListResponseDTO {
    return {
        companies: companiesList.map(companyDtoToCompanyResponseDto)
    }

}
