import { NextResponse } from "next/server";
import Users from "../../../../models/Users";
import dbConnect from "@/lib/db";

export async function GET(request) {
  try {
    await dbConnect();

    const users = await Users.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    // SHAPE THE DATA with AVERAGE SCORE
    const formattedUsers = users.map((user) => {
      // Calculate the average score. Handle the case where quizzesPlayed is 0.
      const averageScore =
        user.quizzesPlayed > 0
          ? Math.round(user.totalScore / user.quizzesPlayed)
          : 0;

      return {
        id: user._id,
        profileImage: user.profileImage,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber || "N/A",
        quizzesPlayed: user.quizzesPlayed || 0,
        // CHANGED: We now send 'averageScore' instead of 'totalScore'
        averageScore: averageScore,
      };
    });

    return NextResponse.json({ users: formattedUsers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users for admin:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
