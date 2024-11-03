/* eslint-disable @typescript-eslint/no-require-imports */
const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.resolve(process.cwd(), "public", "db", "database.sqlite");
const db = new Database(dbPath);

// Create the analysis_results table if it doesn't exist
db.prepare(
  `
    CREATE TABLE IF NOT EXISTS results (
      analysis_id TEXT PRIMARY KEY,
      patent_id TEXT NOT NULL,
      company_name TEXT NOT NULL,
      analysis_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      top_infringing_products TEXT,
      overall_risk_assessment TEXT
    )
`
).run();

console.log("Database initialized");
db.close();
