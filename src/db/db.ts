import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(
  process.cwd(),
  "public",
  "database",
  "database.sqlite"
);
const db = new Database(dbPath);

export default db;
