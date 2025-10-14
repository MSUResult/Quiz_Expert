// File: app/api/getting/chapters/[category]/route.ts

import dbConnect from "@/lib/db";
import Chapter from "@/models/chapters";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  // console.log("[API] GET request received for a chapter category.");
  const { category } = params;

  // console.log(`[API] Extracted category from params: "${category}"`);

  if (!category) {
    // console.log("[API] Category is missing. Sending 400 error.");
    return NextResponse.json(
      { success: false, data: [], error: "Category is required" },
      { status: 400 }
    );
  }

  try {
    // console.log("[API] Connecting to the database...");
    await dbConnect();
    // console.log("[API] Database connection successful.");

    // console.log(`[API] Finding chapters for category: "${category}"`);
    const chapters = await Chapter.find({ category }).sort({
      chapterNumber: 1,
    });
    // console.log(`[API] Database query returned ${chapters.length} chapters.`);

    // console.log("[API] Sending a successful response back to the client.");
    return NextResponse.json({
      success: true,
      data: chapters,
      error: null,
    });
  } catch (error) {
    // console.error("[API] An error occurred in the API route:", error);
    return NextResponse.json(
      { success: false, data: [], error: "Server Error" },
      { status: 500 }
    );
  }
}
