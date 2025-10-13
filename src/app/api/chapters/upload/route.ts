import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import Chapter from "@/models/chapters";

// The function name must be a HTTP method (e.g., GET, POST, PUT)
export async function POST(request) {
  // Always wrap database operations in a try...catch block to handle unexpected errors.
  try {
    // 1. Connect to the database.
    await dbConnect();

    // 2. Parse the incoming request body from the frontend into a JavaScript object.
    const chapters = await request.json();

    // 3. Validate the input. The API should protect itself from bad data.
    if (!Array.isArray(chapters) || chapters.length === 0) {
      return NextResponse.json(
        { message: "Invalid input. Expected a non-empty array of chapters." },
        { status: 400 } // 400 Bad Request
      );
    }

    // 4. Prepare the bulk operations.
    // We loop through the array from the frontend and create an "operation" for each chapter.
    const operations = chapters.map((chapter) => ({
      // We want to perform an "updateOne" operation for each item.
      updateOne: {
        // The 'filter' is how we find the document in the database.
        // We look for a document that matches our unique index.
        filter: {
          category: chapter.category,
          chapterNumber: chapter.chapterNumber,
        },
        // The 'update' is what we do to the document if we find it (or create it).
        // '$set' updates the fields of the document with the new data.
        update: { $set: chapter },
        // 'upsert: true' is the magic. It tells MongoDB:
        // - If a document matching the 'filter' is found, UPDATE it.
        // - If NO document matching the 'filter' is found, INSERT a new one.
        upsert: true,
      },
    }));

    // 5. Execute the bulk write command.
    // This sends all our prepared operations to MongoDB in a single, efficient command.
    const result = await Chapter.bulkWrite(operations);

    // 6. Send a successful and informative response back to the frontend.
    return NextResponse.json(
      {
        message: "Chapters processed successfully.",
        inserted: result.nUpserted, // How many were newly created
        updated: result.nModified, // How many were updated
      },
      { status: 200 } // 200 OK
    );
  } catch (error) {
    // 7. Handle any errors gracefully.
    console.error("Error during bulk chapter upload:", error);

    // Specifically check if it's a validation error from our schema.
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { message: "Data validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 } // 500 Internal Server Error
    );
  }
}
