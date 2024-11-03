// pages/api/items.ts
import { errorResponse } from "@/lib/errorResponse";
import db from "@/db/db";
import { NextResponse } from "next/server";

export function GET() {
  try {
    const rows = db.prepare("SELECT * FROM results").all();

    return NextResponse.json({ rows });
  } catch (error) {
    console.error("Error during SELECT infringement:", error);
    return errorResponse("Failed to SELECT infringement analysis.", 500);
  }
}
