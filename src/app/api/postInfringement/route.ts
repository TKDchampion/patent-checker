import { NextResponse } from "next/server";
import { AnalysisResult } from "@/types/patentModel";
import { errorResponse } from "@/utils/errorResponse";
import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  const data: AnalysisResult = await req.json();

  if (!data) {
    return NextResponse.json(
      { error: "Name and quantity are requireddata." },
      { status: 400 }
    );
  }

  try {
    await sql`
    INSERT INTO results (analysis_id, patent_id, company_name, analysis_date, top_infringing_products, overall_risk_assessment)
    VALUES (
      ${data.analysis_id}, 
      ${data.patent_id}, 
      ${data.company_name}, 
      ${data.analysis_date}, 
      ${JSON.stringify(data.top_infringing_products)},
      ${data.overall_risk_assessment}
      )
    `;

    return NextResponse.json({
      message: "Data inserted successfully",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error during INSERT infringement:", error);
    return errorResponse(
      error.message || "Failed to INSERT infringement analysis.",
      500
    );
  }
}
