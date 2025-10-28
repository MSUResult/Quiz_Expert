import dbConnect from "@/lib/db";
import User from "@/models/Users";

export async function GET() {
  await dbConnect();

  try {
    // Fetch top 20 players sorted by totalScore (highest first)
    const leaderboard = await User.find(
      {},
      "firstName lastName totalScore quizzesPlayed bestScore profileImage"
    )
      .sort({ totalScore: -1 }) // DESCENDING = Top scores first
      .limit(20); // Only top 20 players

    return Response.json({ leaderboard }, { status: 200 });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return Response.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
