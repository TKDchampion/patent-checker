import { AnalysisResult, ResultObject } from "../model";

export function formatResponse(
  patentId: string,
  companyName: string,
  parsedProducts: ResultObject
): AnalysisResult {
  return {
    analysis_id: Date.now().toString(),
    patent_id: patentId,
    company_name: companyName,
    analysis_date: new Date().toISOString().split("T")[0],
    top_infringing_products: parsedProducts.top_infringing_products,
    overall_risk_assessment: parsedProducts.overall_risk_assessment,
  };
}
