import dbConnect from "@/lib/db";
import Chapter from "@/models/chapters";
import { NextResponse } from "next/server";

// ✅ Ensures route is treated as dynamic (avoids caching issues)
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> } // ✅ mark params as a Promise
) {
  const { id } = await context.params; // ✅ must await before using

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

    // ✅ Convert Mongoose document to plain JS object for safe JSON
    const plainChapter = chapter.toObject();

    return NextResponse.json({ success: true, data: plainChapter });
  } catch (error: any) {
    console.error("API Error:", error);

    // ✅ Handle invalid ObjectId format
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
