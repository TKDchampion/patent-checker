import Database from "better-sqlite3";
import { join } from "path";

const dbPath = join(process.cwd(), "public", "database", "database.sqlite");
const db = new Database(dbPath);

export default db;
