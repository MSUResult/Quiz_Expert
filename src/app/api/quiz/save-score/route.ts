import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Users from "../../../../models/Users";
// ✅ CORRECTED: Using the same alias as your login route for consistency
import dbConnect from "@/lib/db";

export async function POST(request: Request) {
  // Added type for robustness if using TS
  try {
    // 1. AUTHENTICATION: Get token from the "auth_token" cookie
    // The line that was causing the error is now fixed. We access cookies directly.
    const token = cookies().get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    // Verify the token using your JWT_SECRET
    let decoded;
    try {
      // It's safer to use the variable from process.env directly here
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    // The user ID from the token is the secure source of identity
    const userId = (decoded as { id: string }).id; // Type assertion for safety

    // 2. GET DATA: Parse the incoming request body
    const { chapterId, score } = await request.json();

    if (!chapterId || typeof score !== "number") {
      return NextResponse.json(
        { message: "Missing chapterId or score" },
        { status: 400 }
      );
    }

    await dbConnect();

    // 3. FIND USER: Find the user in the database using the ID from the token
    const user = await Users.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 4. CORE LOGIC: Check if score for this chapter already exists
    const hasAlreadyPlayed = user.quizHistory.some(
      (entry) => entry.chapterId.toString() === chapterId
    );

    if (hasAlreadyPlayed) {
      return NextResponse.json(
        { message: "Score for this chapter has already been recorded." },
        { status: 200 }
      );
    }

    // 5. SAVE SCORE: If it's the first time, add the result to the history
    user.quizHistory.push({ chapterId, score });
    user.quizzesPlayed = (user.quizzesPlayed || 0) + 1;
    user.totalScore = (user.totalScore || 0) + score;

    await user.save();

    return NextResponse.json(
      { message: "Score saved successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving quiz score:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
