import { NextResponse } from "next/server";
import otpStore from "@/lib/otpStore";

export async function POST(req: Request) {
  console.log("🟢 [verifyOtp] API called");

  try {
    const { phoneNumber, otp } = await req.json();
    console.log("📞 Phone:", phoneNumber, "| 🔢 Entered OTP:", otp);

    const storedOtp = otpStore.get(phoneNumber);
    console.log("💾 Stored OTP for phone:", phoneNumber, "→", storedOtp);

    if (storedOtp && storedOtp === otp) {
      console.log("✅ OTP matched! Deleting OTP from store...");
      otpStore.delete(phoneNumber);
      return NextResponse.json({ success: true, message: "OTP verified" });
    }

    console.warn("❌ Invalid OTP provided or not found!");
    return NextResponse.json(
      { success: false, message: "Invalid OTP" },
      { status: 400 }
    );
  } catch (err: any) {
    console.error("🔥 Verification error:", err);
    return NextResponse.json(
      { success: false, message: "Server error during verification" },
      { status: 500 }
    );
  }
}
