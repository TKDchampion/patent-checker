// app/api/checkInfringement/route.ts
import { NextResponse } from "next/server";
import { CompanyProducts, Patent } from "./model";
import { getInfringementAnalysis } from "./lib/getInfringementAnalysis";
import { validateParams } from "./helper/validateParams";
import { findPatent } from "./helper/findPatent";
import { findCompany } from "./helper/findCompany";
import { formatResponse } from "./helper/formatResponse";
import getJsonFile from "@/lib/getJsonFile";
import { errorResponse } from "@/lib/errorResponse";

const patentsData = getJsonFile<Patent[]>("patents");
const companiesData = getJsonFile<CompanyProducts>("company_products");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const patentId = searchParams.get("patentId") || "";
  const companyName = searchParams.get("companyName") || "";

  const validationError = validateParams(patentId, companyName);
  if (validationError) return errorResponse(validationError, 400);

  const patent = findPatent(patentsData, patentId!);
  const company = findCompany(companiesData, companyName!);

  if (!patent || !company) {
    return errorResponse("Patent or company not found.", 404);
  }

  try {
    const parsedProducts = await getInfringementAnalysis(patent, company);
    const formattedResponse = formatResponse(
      patentId!,
      companyName!,
      parsedProducts
    );
    return NextResponse.json(formattedResponse);
  } catch (error) {
    console.error("Error during infringement analysis:", error);
    return errorResponse("Failed to complete infringement analysis.", 500);
  }
}
