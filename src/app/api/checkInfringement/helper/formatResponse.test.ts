import { formatResponse } from "./formatResponse";
import { AnalysisResult, ResultObject } from "../model";

describe("formatResponse", () => {
  it("should return a properly formatted AnalysisResult object", () => {
    // Mock input data
    const patentId = "12345";
    const companyName = "TestCompany";
    const parsedProducts: ResultObject = {
      top_infringing_products: [
        {
          product_name: "Product A",
          infringement_likelihood: 85,
          relevant_claims: ["Claim 1", "Claim 2"],
          explanation: "Detailed explanation for Product A",
          specific_features: ["Feature 1", "Feature 2"],
        },
        {
          product_name: "Product B",
          infringement_likelihood: 70,
          relevant_claims: ["Claim 3"],
          explanation: "Detailed explanation for Product B",
          specific_features: ["Feature 3", "Feature 4"],
        },
      ],
      overall_risk_assessment: "High",
    };

    // Call the function
    const result: AnalysisResult = formatResponse(
      patentId,
      companyName,
      parsedProducts
    );

    // Assertions
    expect(result.analysis_id).toBeDefined(); // Check if analysis_id is generated
    expect(result.analysis_id).toMatch(/^\d+$/); // Ensure analysis_id is a numeric string
    expect(result.patent_id).toBe(patentId);
    expect(result.company_name).toBe(companyName);
    expect(result.analysis_date).toBe(new Date().toISOString().split("T")[0]);
    expect(result.overall_risk_assessment).toBe(
      parsedProducts.overall_risk_assessment
    );

    // Verify the structure and values of top_infringing_products
    expect(result.top_infringing_products).toHaveLength(2);
    expect(result.top_infringing_products[0]).toEqual({
      product_name: "Product A",
      infringement_likelihood: 85,
      relevant_claims: ["Claim 1", "Claim 2"],
      explanation: "Detailed explanation for Product A",
      specific_features: ["Feature 1", "Feature 2"],
    });
    expect(result.top_infringing_products[1]).toEqual({
      product_name: "Product B",
      infringement_likelihood: 70,
      relevant_claims: ["Claim 3"],
      explanation: "Detailed explanation for Product B",
      specific_features: ["Feature 3", "Feature 4"],
    });
  });
});
