import dbConnect from "@/lib/db";
import Chapter from "@/models/chapters";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ category: string }> }
) {
  // ✅ Await the params — required in Next.js 15+
  const { category } = await context.params;

  if (!category) {
    return NextResponse.json(
      { success: false, data: [], error: "Category is required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const chapters = await Chapter.find({ category }).sort({
      chapterNumber: 1,
    });

    return NextResponse.json({
      success: true,
      data: chapters,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return NextResponse.json(
      { success: false, data: [], error: "Server Error" },
      { status: 500 }
    );
  }
}
