// pages/api/init-db.js
import { createResultsTable } from "@/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await createResultsTable();
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
