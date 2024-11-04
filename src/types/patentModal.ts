export interface Patent {
  id: string;
  claims: string;
}

export interface Product {
  name: string;
  description: string;
}

export interface CompanyProducts {
  companies: Company[];
}

export interface Company {
  name: string;
  products: Product[];
}

export interface InfringingProduct {
  product_name: string;
  infringement_likelihood: number;
  relevant_claims: string[];
  explanation: string;
  specific_features: string[];
}

export interface AnalysisResult {
  analysis_id: string;
  patent_id: string;
  company_name: string;
  analysis_date: string;
  top_infringing_products: InfringingProduct[];
  overall_risk_assessment: string;
}

export interface ResultObject {
  top_infringing_products: InfringingProduct[];
  overall_risk_assessment: string;
}
