// export interface Patent {
//   id: string;
//   claims: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   [key: string]: any;
// }
export interface Patent {
  id: number;
  publication_number: string;
  title: string;
  ai_summary: string;
  raw_source_url: string;
  assignee: string;
  inventors: string;
  priority_date: string;
  application_date: string;
  grant_date: string;
  abstract: string;
  description: string;
  claims: string;
  jurisdictions: string;
  classifications: string;
  application_events: string;
  citations: string;
  image_urls: string;
  landscapes: string;
  created_at: string;
  updated_at: string;
  publish_date: string;
  citations_non_patent: string;
  provenance: string;
  attachment_urls: null;
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
