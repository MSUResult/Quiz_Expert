// src/lib/data.ts

import Chapter from "@/models/chapters";
import dbConnect from "./db";


export async function getChaptersByCategory(category: string) {
  try {
    await dbConnect();
    const chapters = await Chapter.find({ category: category }).lean();
    // Use .lean() for faster, read-only operations
    // Mongoose returns BSON, we need to convert it to a plain object
    return JSON.parse(JSON.stringify(chapters));
  } catch (error) {
    console.error("Database Error:", error);
    // Throw an error so the calling function knows something went wrong
    throw new Error("Failed to fetch chapters from database.");
  }
}
