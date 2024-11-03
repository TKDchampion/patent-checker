// pages/api/items.ts
import db from "@/db/db";
import { NextResponse } from "next/server";
import { AnalysisResult } from "../checkInfringement/model";
import { errorResponse } from "@/lib/errorResponse";

export async function POST(req: Request) {
  const data: AnalysisResult = await req.json();

  if (!data) {
    return NextResponse.json(
      { error: "Name and quantity are required" },
      { status: 400 }
    );
  }

  try {
    const stmt = db.prepare(
      "INSERT INTO results (analysis_id, patent_id, company_name, analysis_date, top_infringing_products, overall_risk_assessment) VALUES (?, ?, ?, ?, ?, ?)"
    );
    const info = stmt.run(
      data.analysis_id,
      data.patent_id,
      data.company_name,
      data.analysis_date,
      JSON.stringify(data.top_infringing_products),
      data.overall_risk_assessment
    );

    return NextResponse.json({
      message: "Data inserted successfully",
      id: info.lastInsertRowid,
    });
  } catch (error) {
    console.error("Error during INSERT infringement:", error);
    return errorResponse("Failed to INSERT infringement analysis.", 500);
  }
}
