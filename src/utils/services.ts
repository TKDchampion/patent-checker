import { AnalysisResult, InfringingProduct } from "@/types/patentModel";
import { ApiConfig } from "./base-services/model";
import BaseServices from "./base-services";

const baseServices = new BaseServices();

export const fetchInfringementData = (
  patentId: string,
  companyName: string
): Promise<AnalysisResult> => {
  const config: ApiConfig = {
    url: `/api/checkInfringement?patentId=${patentId}&companyName=${companyName}`,
  };

  return baseServices.get(config);
};

export const fetchInfringementHistory = async (): Promise<AnalysisResult[]> => {
  const config: ApiConfig = {
    url: "/api/getInfringements",
  };

  const data = (await baseServices.get(config)) as { rows: AnalysisResult[] };

  const transformType = (
    value: string | InfringingProduct[]
  ): InfringingProduct[] => {
    return JSON.parse(value as string);
  };

  return data.rows.map((item: AnalysisResult) => ({
    ...item,
    top_infringing_products: transformType(item.top_infringing_products),
  }));
};

export const saveInfringementResult = async (
  result: AnalysisResult
): Promise<AnalysisResult> => {
  const config: ApiConfig = {
    url: "/api/postInfringement",
    body: result,
  };

  return await baseServices.post(config);
};

export const createTable = async (): Promise<AnalysisResult> => {
  const config: ApiConfig = {
    url: "/api/createTable",
  };

  return await baseServices.post(config);
};
