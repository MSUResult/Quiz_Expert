// ✅ File: src/app/api/sendOtp/route.ts
import { NextResponse } from "next/server";
import twilio from "twilio";
import otpStore from "@/lib/otpStore";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const fromNumber = process.env.TWILIO_PHONE_NUMBER!;

const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
  console.log("🟢 [sendOtp] API called");

  try {
    // ✅ Parse JSON safely
    const { phoneNumber } = await req.json();

    if (!phoneNumber) {
      console.warn("⚠️ No phone number provided!");
      return NextResponse.json(
        { success: false, message: "Phone number required" },
        { status: 400 }
      );
    }

    // ✅ Generate a random OTP (4 digits)
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

    console.log("📞 Phone:", phoneNumber, "Generated OTP:", otpCode);

    // ✅ Save OTP for later verification
    otpStore.set(phoneNumber, otpCode);
    console.log("💾 Stored:", phoneNumber, "→", otpCode);

    // ✅ Send OTP via Twilio
    const message = await client.messages.create({
      body: `Your Expert Academy verification code is ${otpCode}`,
      from: fromNumber,
      to: phoneNumber,
    });

    console.log("✅ Twilio Message sent! SID:", message.sid);
    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error: any) {
    console.error("🔥 Twilio Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to send OTP" },
      { status: 500 }
    );
  }
}
