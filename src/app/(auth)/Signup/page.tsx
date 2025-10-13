"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Signup() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phoneNumber")?.toString().trim();

    console.log("🧩 Signup form data before sending:", {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email,
      phoneNumber: phone,
      password: formData.get("password"),
    });

    if (!email && !phone) {
      alert("❌ Please provide either an Email or a Phone Number.");
      return;
    }

    const imageFile = (
      document.getElementById("imageUpload") as HTMLInputElement
    )?.files?.[0];
    if (imageFile) formData.append("profileImage", imageFile);

    try {
      console.log("📤 Sending signup data to backend...");

      const res = await fetch("/api/signup", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      console.log("✅ Server response:", result);

      if (result.success) {
        alert("✅ Account created successfully!");
        form.reset();
        setPreview(null);

        // 🔹 Redirect to login page after successful signup
        window.location.href = "/login";
      } else {
        alert("❌ " + result.message);
      }
    } catch (error: any) {
      console.error("🔥 Signup error:", error);
      alert("❌ " + error.message);
    }
  };

  return (
    <main className="flex h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden">
      {/* LEFT SIDE - Animated Design */}
      <section className="flex-1 relative flex items-center justify-center overflow-hidden hidden md:flex">
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

      {/* RIGHT SIDE - Signup Form */}
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
            {/* IMAGE UPLOAD */}
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
              <p className="text-gray-400 text-sm">
                Upload your profile picture
              </p>
            </div>

            {/* INPUT FIELDS */}
            <div className="flex gap-3 w-full flex-wrap">
              <input
                name="firstName"
                type="text"
                placeholder="First name"
                className="flex-1 min-w-[48%] p-3 rounded-lg bg-[#2e2e2e] focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last name"
                className="flex-1 min-w-[48%] p-3 rounded-lg bg-[#2e2e2e] focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* BOTH FIELDS NOW AVAILABLE */}
            <input
              name="email"
              type="email"
              placeholder="Email (optional if phone is provided)"
              className="p-3 rounded-lg bg-[#2e2e2e] focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              name="phoneNumber"
              type="tel"
              placeholder="Phone Number (optional if email is provided)"
              className="p-3 rounded-lg bg-[#2e2e2e] focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="p-3 rounded-lg bg-[#2e2e2e] focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold p-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20"
            >
              Create Account
            </motion.button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
