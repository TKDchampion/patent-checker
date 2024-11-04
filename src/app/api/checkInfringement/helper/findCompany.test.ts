import { findCompany } from "./findCompany";
import { CompanyProducts } from "@/types/patentModal";

describe("findCompany", () => {
  // Mock data for CompanyProducts with detailed product information
  const mockCompaniesData: CompanyProducts = {
    companies: [
      {
        name: "Apple",
        products: [
          { name: "iPhone", description: "A smartphone by Apple" },
          { name: "MacBook", description: "A laptop by Apple" },
        ],
      },
      {
        name: "Google",
        products: [
          { name: "Pixel", description: "A smartphone by Google" },
          { name: "Nest", description: "A smart home device by Google" },
        ],
      },
      {
        name: "Microsoft",
        products: [
          { name: "Surface", description: "A tablet by Microsoft" },
          { name: "Windows", description: "An operating system by Microsoft" },
        ],
      },
    ],
  };

  it("should return the correct company object if the company name matches", () => {
    const result = findCompany(mockCompaniesData, "Google");
    expect(result).toEqual({
      name: "Google",
      products: [
        { name: "Pixel", description: "A smartphone by Google" },
        { name: "Nest", description: "A smart home device by Google" },
      ],
    });
  });

  it("should return undefined if the company name does not match any in the data", () => {
    const result = findCompany(mockCompaniesData, "Amazon");
    expect(result).toBeUndefined();
  });

  it("should be case-insensitive when matching company names", () => {
    const result = findCompany(mockCompaniesData, "apple");
    expect(result).toEqual({
      name: "Apple",
      products: [
        { name: "iPhone", description: "A smartphone by Apple" },
        { name: "MacBook", description: "A laptop by Apple" },
      ],
    });
  });
});
