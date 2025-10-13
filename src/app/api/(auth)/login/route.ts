import dbConnect from "@/lib/db";
import Users from "@/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// ✅ Use environment variable for security
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // fallback for local dev

export async function POST(req) {
  try {
    // 1️⃣ Connect to DB
    await dbConnect();

    // 2️⃣ Parse JSON body
    const { email, password } = await req.json();

    // 3️⃣ Find the user and include password for comparison
    const user = await Users.findOne({ email }).select("+password");
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // 4️⃣ Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // 5️⃣ Create JWT payload and sign token
    const tokenPayload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: "7d", // Token valid for 7 days
    });

    // 6️⃣ Store token in HttpOnly cookie
    const cookieStore = cookies();
    cookieStore.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only secure in production
      sameSite: "strict", // prevent CSRF
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    // 7️⃣ Return success response
    return new Response(
      JSON.stringify({
        message: "Login successful",
        user: {
          id: user._id,
          firstName: user.firstName,
          email: user.email,
          role: user.role,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Login error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
