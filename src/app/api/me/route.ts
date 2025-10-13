import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import dbConnect from "@/lib/db";
import User from "@/models/Users";
import { NextResponse } from "next/server";

// Required to avoid static optimization warning
export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();

  // ✅ Await cookies() explicitly
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  const user = await User.findById(decoded.id).select(
    "firstName lastName profileImage email phoneNumber role totalScore quizzesPlayed bestScore lastPlayed"
  );

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, user }, { status: 200 });
}
