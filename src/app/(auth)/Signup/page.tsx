"use client";

import Link from "next/link";
import { motion } from "framer-motion"; // Removed AnimatePresence
import { useState } from "react";

export default function Signup() {
  const [preview, setPreview] = useState<string | null>(null);
  // Removed: const [otp, setOtp] = useState("");
  // Removed: const [showOtpBox, setShowOtpBox] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  // Removed: const [isVerified, setIsVerified] = useState(false);

  // ✅ Image Preview Handler (Keep this)
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

  // ❌ REMOVED: handleVerify function is no longer needed

  // ❌ REMOVED: handleOtpSubmit function is no longer needed

  // ✅ Signup Submit (Updated)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("📝 [handleSubmit] Signup form submitted");

    // ❌ REMOVED: if (!isVerified) { ... } check

    const form = e.currentTarget;
    const formData = new FormData(form);
    const imageFile = (
      document.getElementById("imageUpload") as HTMLInputElement
    )?.files?.[0];

    if (imageFile) {
      formData.append("profileImage", imageFile);
      console.log("📸 Attached image to FormData:", imageFile.name);
    }

    // Ensure phoneNumber is correct on formData (it should be, but let's confirm)
    // The input is named "phoneNumber" and is part of the form, so it's included.

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
      {/* ... (Left Section remains the same) ... */}

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
            {/* ... (Image Upload and Name Inputs remain the same) ... */}

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

            {/* Phone Input (Keep this, remove Verify button) */}
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
                className="flex-1 p-3 rounded-lg bg-[#2e2e2e] focus:ring-2 focus:ring-blue-500 outline-none w-full"
                required
              />
              {/* ❌ REMOVED the entire Verify button */}
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

      {/* ❌ REMOVED the entire OTP Modal/AnimatePresence block */}
    </main>
  );
}
