import { sql } from "@vercel/postgres";

export async function createResultsTable() {
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
}
