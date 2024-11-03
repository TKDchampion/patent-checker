import { errorResponse } from "@/lib/errorResponse";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM results`;
    return NextResponse.json({ rows });
  } catch (error) {
    console.error("Error during SELECT infringement:", error);
    return errorResponse("Failed to SELECT infringement analysis.", 500);
  }
}
