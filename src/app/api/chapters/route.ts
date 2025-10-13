import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Chapter from "@/models/chapters";

export async function POST(request) {
  try {
    await dbConnect();

    const chapterData = await request.json();

    // Instead of creating blindly, we use the same "upsert" logic.
    // This ensures that even the manual form can be used to update a chapter
    // if the user enters a category and chapter number that already exist.
    const filter = {
      category: chapterData.category,
      chapterNumber: chapterData.chapterNumber,
    };

    const updatedChapter = await Chapter.findOneAndUpdate(filter, chapterData, {
      new: true, // Return the new, updated document
      upsert: true, // Create it if it doesn't exist
      runValidators: true, // Make sure to run the schema validations
    });

    return NextResponse.json(
      { message: "Chapter saved successfully", data: updatedChapter },
      { status: 201 } // 201 Created
    );
  } catch (error) {
    console.error("Error saving chapter:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { message: "Data validation failed", details: error.errors },
        { status: 400 }
      );
    }

    // You could also specifically check for the duplicate key error (11000)
    // though findOneAndUpdate with upsert makes it less likely to occur directly.
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "A chapter with this category and number already exists." },
        { status: 409 }
      ); // 409 Conflict
    }

    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
