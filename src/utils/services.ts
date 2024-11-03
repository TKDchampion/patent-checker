import { AnalysisResult } from "@/app/api/checkInfringement/model";

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
