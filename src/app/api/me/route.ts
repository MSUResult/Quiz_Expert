import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import dbConnect from "@/lib/db";
import User from "@/models/Users";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();

  // 🍪 Get auth token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  // 🔍 Verify token
  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  // 🔎 Find user by decoded ID
  const user = await User.findById(decoded.id).select(
    "firstName lastName profileImage email phoneNumber role totalScore quizzesPlayed bestScore lastPlayed"
  );

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // ✅ Return user info
  return NextResponse.json({ success: true, user }, { status: 200 });
}
