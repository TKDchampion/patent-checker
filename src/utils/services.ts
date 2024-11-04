import { AnalysisResult, InfringingProduct } from "@/types/patentModel";

export const fetchInfringementData = async (
  patentId: string,
  companyName: string
): Promise<AnalysisResult> => {
  const res = await fetch(
    `/api/checkInfringement?patentId=${patentId}&companyName=${companyName}`
  );
  if (!res.ok) throw new Error("Failed to fetch infringement data.");
  return res.json();
};

export const fetchInfringementHistory = async (): Promise<AnalysisResult[]> => {
  const res = await fetch("/api/getInfringements");
  if (!res.ok) throw new Error("Failed to fetch infringement history.");
  const data = await res.json();

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
): Promise<void> => {
  const res = await fetch("/api/postInfringement", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result),
  });
  if (!res.ok) throw new Error("Failed to save infringement data.");
};

export const createTable = async (): Promise<void> => {
  const res = await fetch("/api/createTable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to createTable.");
};
