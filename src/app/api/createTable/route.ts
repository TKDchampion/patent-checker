import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS results (
      analysis_id TEXT PRIMARY KEY,
      patent_id TEXT NOT NULL,
      company_name TEXT NOT NULL,
      analysis_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      top_infringing_products TEXT,
      overall_risk_assessment TEXT
    );
    `;
    return NextResponse.json({
      message: "Results table created successfully.",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Error creating results table.",
      },
      { status: 500 }
    );
  }
}
