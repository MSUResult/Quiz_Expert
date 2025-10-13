import dbConnect from "@/lib/db";
import Chapter from "@/models/chapters";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { category } = params;

  if (!category) {
    return NextResponse.json(
      { success: false, error: "Category is required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    // Find all chapters matching the category and sort them by chapterNumber
    const chapters = await Chapter.find({ category: category }).sort({
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
