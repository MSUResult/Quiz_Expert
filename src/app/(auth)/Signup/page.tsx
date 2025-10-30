"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Signup() {
  const [preview, setPreview] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // ✅ Image Preview Handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("📸 Image change triggered");
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      console.log("✅ Preview image set:", previewUrl);
    } else {
      console.warn("⚠️ No image selected");
    }
  };

  // ✅ Send OTP (calls backend)
  const handleVerify = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("📞 [handleVerify] Triggered for phone:", phoneNumber);

    if (!phoneNumber) {
      alert("⚠️ Please enter your phone number first!");
      console.warn("❌ No phone number entered!");
      return;
    }

    const otpCode = Math.floor(1000 + Math.random() * 9000);
    console.log("🔢 Generated OTP:", otpCode);

    try {
      console.log("🚀 Sending OTP request to backend...");
      const res = await fetch("/api/sendOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      console.log("📩 Response received from /api/sendOtp");
      const data = await res.json();
      console.log("📦 Response data:", data);

      if (data.success) {
        alert("📩 OTP sent successfully!");
        setShowOtpBox(true);
        console.log("✅ OTP box opened for verification");
      } else {
        console.error("❌ OTP send failed:", data.message);
        alert("❌ Failed to send OTP: " + data.message);
      }
    } catch (err) {
      console.error("🔥 Error sending OTP:", err);
      alert("❌ Error sending OTP");
    }
  };

  // ✅ Verify entered OTP
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "🟢 [handleOtpSubmit] Verifying OTP:",
      otp,
      "for phone:",
      phoneNumber
    );

    try {
      const res = await fetch("/api/verifyOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      console.log("📩 Response received from /api/verifyOtp");
      const data = await res.json();
      console.log("📦 OTP verification response:", data);

      if (data.success) {
        alert("✅ OTP verified successfully!");
        setIsVerified(true);
        setShowOtpBox(false);
        console.log("✅ OTP verified — user marked as verified");
      } else {
        console.warn("❌ Invalid OTP entered:", otp);
        alert("❌ Invalid OTP. Try again!");
      }
    } catch (err) {
      console.error("🔥 Server error verifying OTP:", err);
      alert("❌ Server error verifying OTP");
    }
  };

  // ✅ Signup Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("📝 [handleSubmit] Signup form submitted");

    if (!isVerified) {
      console.warn("⚠️ Phone not verified — blocking signup");
      alert("⚠️ Please verify your phone number first!");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const imageFile = (
      document.getElementById("imageUpload") as HTMLInputElement
    )?.files?.[0];

    if (imageFile) {
      formData.append("profileImage", imageFile);
      console.log("📸 Attached image to FormData:", imageFile.name);
    }

    console.log("🚀 Sending signup data to /api/signup...");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: formData,
      });

      console.log("📩 Response received from /api/signup");
      const result = await res.json();
      console.log("📦 Signup response:", result);

      if (result.success) {
        alert("✅ Account created successfully!");
        console.log("🎉 Signup successful — redirecting to login...");
        form.reset();
        setPreview(null);
        window.location.href = "/login";
      } else {
        console.error("❌ Signup failed:", result.message);
        alert("❌ " + result.message);
      }
    } catch (error: any) {
      console.error("🔥 Signup error:", error);
      alert("❌ " + error.message);
    }
  };

  return (
    <main className="flex h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden">
      {/* Left Section */}
      <section className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-500 blur-3xl opacity-40"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="z-10 text-center px-4"
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Welcome to Expert Academy
          </h1>
          <p className="text-gray-300 text-lg max-w-md mx-auto">
            Learn. Grow. Achieve your dream career with the power of smart
            education.
          </p>
        </motion.div>
      </section>

      {/* Signup Form */}
      <section className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-xl border border-white/20 w-full max-w-md"
        >
          <h1 className="text-3xl font-bold mb-2 text-center">
            Create an Account
          </h1>
          <p className="text-gray-400 text-center mb-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 underline">
              Log in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Image Upload */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-24 h-24">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[#2e2e2e] flex items-center justify-center text-gray-400 border border-gray-600">
                    <span className="text-sm">No Image</span>
                  </div>
                )}
                <label
                  htmlFor="imageUpload"
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-xs p-1 rounded-full cursor-pointer"
                >
                  📸
                </label>
                <input
                  id="imageUpload"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Name Inputs */}
            <div className="flex gap-3">
              <input
                name="firstName"
                type="text"
                placeholder="First name"
                className="flex-1 p-3 rounded-lg bg-[#2e2e2e] focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last name"
                className="flex-1 p-3 rounded-lg bg-[#2e2e2e] focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Email */}
            <input
              name="email"
              type="email"
              placeholder="Email (Optional)"
              className="p-3 rounded-lg bg-[#2e2e2e] focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Phone + Verify */}
            <div className="flex gap-2 items-center">
              <input
                name="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  console.log("📞 Phone input changed:", e.target.value);
                }}
                placeholder="Phone Number"
                className="flex-1 p-3 rounded-lg bg-[#2e2e2e] focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <button
                onClick={handleVerify}
                type="button"
                className="px-3 py-2 border border-blue-400 rounded-lg text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
              >
                {isVerified ? "✅ Verified" : "Verify"}
              </button>
            </div>

            {/* Password */}
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="p-3 rounded-lg bg-[#2e2e2e] focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold p-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20"
            >
              Create Account
            </motion.button>
          </form>
        </motion.div>
      </section>

      {/* OTP Modal */}
      <AnimatePresence>
        {showOtpBox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#1e293b] p-6 rounded-2xl shadow-lg border border-white/20 w-[90%] max-w-sm text-center"
            >
              <h2 className="text-xl font-semibold mb-3 text-blue-400">
                Enter OTP Code
              </h2>
              <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    console.log("⌨️ OTP input changed:", e.target.value);
                  }}
                  className="text-center text-lg tracking-widest p-3 rounded-lg bg-[#2e2e2e] focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="____"
                  required
                />
                <div className="flex gap-2 justify-center">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
                  >
                    Verify OTP
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowOtpBox(false);
                      console.log("❌ OTP modal closed manually");
                    }}
                    className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
