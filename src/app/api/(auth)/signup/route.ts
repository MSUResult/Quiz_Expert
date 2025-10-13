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
    const phoneNumber = formData.get("phoneNumber"); // ✅ Get phone number
    const password = formData.get("password");
    const file = formData.get("profileImage");

    // ✅ VALIDATION: Ensure at least one contact method is provided
    if (!email && !phoneNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide an email or a phone number.",
        },
        { status: 400 }
      );
    }

    // ✅ CHECK FOR EXISTING USER by email OR phone
    const existingUserQuery = [];
    if (email) existingUserQuery.push({ email });
    if (phoneNumber) existingUserQuery.push({ phoneNumber });

    const existingUser = await User.findOne({ $or: existingUserQuery });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email or phone number already exists.",
        },
        { status: 409 } // 409 Conflict
      );
    }

    let profileImageUrl = null;
    if (file && typeof file === "object") {
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

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Save to MongoDB with the new phoneNumber field
    const newUser = await User.create({
      firstName,
      lastName,
      email: email || null, // Store null if empty
      phoneNumber: phoneNumber || null, // Store null if empty
      password: hashedPassword,
      profileImage: profileImageUrl,
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
    console.error("Signup error:", err);
    // Provide a more specific error for duplicate key errors
    if (err.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "This email or phone number is already taken.",
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, message: err.message || "An internal error occurred." },
      { status: 500 }
    );
  }
}
