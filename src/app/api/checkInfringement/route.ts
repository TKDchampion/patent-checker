import { NextResponse } from "next/server";
import { CompanyProducts, Patent } from "@/types/patentModel";
import { validateParams } from "./helper/validateParams";
import { findPatent } from "./helper/findPatent";
import { findCompany } from "./helper/findCompany";
// import getJsonFile from "@/utils/getJsonFile";
import { errorResponse } from "@/utils/errorResponse";
import { getInfringementAnalysisByGroq } from "./lib/getInfringementAnalysisByGroq";
import { formatResponse } from "./helper/formatResponse";
import companyProducts from "@/app/json/company_products.json";
import patents from "@/app/json/patents.json";

// const patentsData = getJsonFile<Patent[]>("patents");
// const companiesData = getJsonFile<CompanyProducts>("company_products");
const patentsData: Patent[] = patents;
const companiesData: CompanyProducts = companyProducts;
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
    const parsedProducts = await getInfringementAnalysisByGroq(patent, company);
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
