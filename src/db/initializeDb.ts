import { createResultsTable } from "./db";
// const { createResultsTable } = require("./db");

async function main() {
  try {
    await createResultsTable();
    console.log("Results table created successfully.");
  } catch (error) {
    console.error("Error creating results table:", error);
  }
  process.exit(0);
}

main();
