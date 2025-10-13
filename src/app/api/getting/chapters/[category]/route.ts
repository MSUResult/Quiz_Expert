import dbConnect from "@/lib/db";
import Chapter from "@/models/chapters";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ category: string }> } // 👈 params is a Promise in Next.js 15
) {
  const { category } = await context.params; // 👈 await it!

  if (!category) {
    return NextResponse.json(
      { success: false, error: "Category is required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const chapters = await Chapter.find({ category }).sort({
      chapterNumber: 1,
    });

    if (!chapters || chapters.length === 0) {
      return NextResponse.json(
        { success: false, error: "No chapters found for this category" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: chapters });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}
