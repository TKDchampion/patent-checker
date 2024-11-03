import { CompanyProducts } from "../model";

export function findCompany(
  companiesData: CompanyProducts,
  companyName: string
) {
  return companiesData.companies.find(
    (c) => c.name.toLowerCase() === companyName.toLowerCase()
  );
}
