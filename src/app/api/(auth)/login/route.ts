import dbConnect from "@/lib/db";
import Users from "@/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // prevents static caching

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req) {
  try {
    await dbConnect();
    const { phoneNumber, password } = await req.json();

    // 🔍 Check user existence
    const user = await Users.findOne({ phoneNumber }).select("+password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 🔒 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 🎫 Create JWT token
    const tokenPayload = {
      id: user._id,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: "7d",
    });

    // 🍪 Set cookie safely depending on environment
    const isProd = process.env.NODE_ENV === "production";

    cookies().set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: false, // only true on HTTPS
      sameSite: "lax", // <--- CHANGE THIS TO "lax"
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    // 🧍 Prepare safe user response (don’t send password)
    const userResponse = {
      id: user._id,
      firstName: user.firstName,
      phoneNumber: user.phoneNumber,
      role: user.role,
      ...(user.email && { email: user.email }),
    };

    return NextResponse.json(
      {
        message: "Login successful",
        user: userResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Login error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
