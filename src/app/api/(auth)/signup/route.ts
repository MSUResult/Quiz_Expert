import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/Users";

export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phoneNumber = formData.get("phoneNumber");
    const password = formData.get("password");
    const file = formData.get("profileImage");

    // ✅ VALIDATION: phone number is now required, email optional
    if (!firstName || !lastName || !phoneNumber || !password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "First name, last name, phone number, and password are required.",
        },
        { status: 400 }
      );
    }

    // ✅ Check if user already exists (by email or phone)
    const existingUserQuery = [];
    if (email) existingUserQuery.push({ email });
    // Phone number is always present, so we always check it
    existingUserQuery.push({ phoneNumber });

    const existingUser = await User.findOne({ $or: existingUserQuery });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email or phone number already exists.",
        },
        { status: 409 } // Conflict
      );
    }

    // ✅ Upload profile image to Cloudinary (if provided)
    let profileImageUrl = null;

    // ▼▼▼ SOLUTION: Check the file size to prevent empty uploads ▼▼▼
    if (file && file.size > 0) {
      // ▲▲▲ This is the only line that was changed.

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "expert_academy_users" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });
      profileImageUrl = uploadRes.secure_url;
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Save user to MongoDB
    const newUser = await User.create({
      firstName,
      lastName,
      email: email || null, // store null if no email provided
      phoneNumber,
      password: hashedPassword,
      profileImage: profileImageUrl, // Will use the default from your schema if null
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully!",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("🔥 Signup error:", err);

    // Handle duplicate key errors (MongoDB)
    if (err.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "This email or phone number is already taken.",
        },
        { status: 409 }
      );
    }

    // Generic error fallback
    return NextResponse.json(
      {
        success: false,
        message: err.message || "An internal server error occurred.",
      },
      { status: 500 }
    );
  }
}
