import dbConnect from "@/lib/db";
import Chapter from "@/models/chapters";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Chapter ID is required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const chapter = await Chapter.findById(id);

    if (!chapter) {
      return NextResponse.json(
        { success: false, error: "Chapter not found" },
        { status: 404 }
      );
    }

    // We can convert the Mongoose document to a plain object
    const plainChapter = chapter.toObject();

    return NextResponse.json({ success: true, data: plainChapter });
  } catch (error) {
    console.error("API Error:", error);
    // Handle potential invalid ID format errors from MongoDB
    if (error.kind === "ObjectId") {
      return NextResponse.json(
        { success: false, error: "Invalid Chapter ID format" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}
