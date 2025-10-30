import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/Users";

export const POST = async (req) => {
  await dbConnect();

  try {
    const { email, password, confirmPassword } = await req.json();

    // ✅ Step 1: Check if email provided
    if (!email) {
      return NextResponse.json({
        success: false,
        message: "Please provide an email.",
      });
    }

    // ✅ Step 2: Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found. Check your email.",
      });
    }

    // ✅ Step 3: If password fields not provided yet → just confirm email found
    if (!password && !confirmPassword) {
      return NextResponse.json({
        success: true,
        message: "Email found. You can reset your password now.",
      });
    }

    // ✅ Step 4: If user enters password → validate match
    if (password !== confirmPassword) {
      return NextResponse.json({
        success: false,
        message: "Passwords do not match!",
      });
    }

    // ✅ Step 5: Update password (in real-world: hash before saving)
    user.password = password;
    await user.save();

    // ✅ Step 6: Final success
    return NextResponse.json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.error("❌ Forget Password Error:", error);
    return NextResponse.json({
      success: false,
      message: "Server error. Try again later.",
    });
  }
};
