import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
import User from "@/models/Users";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req) {
  try {
    await dbConnect();

    // 1️⃣ Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    // 2️⃣ Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    // 3️⃣ Get new name from request body
    const { firstName } = await req.json();
    if (!firstName || firstName.trim().length < 2) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    // 4️⃣ Update user's name in DB
    await User.findByIdAndUpdate(decoded.id, { firstName });

    // 5️⃣ Return success
    return NextResponse.json({
      success: true,
      message: "Name updated successfully",
    });
  } catch (error) {
    console.error("Error updating name:", error);
    return NextResponse.json(
      { error: "Failed to update name" },
      { status: 500 }
    );
  }
}
