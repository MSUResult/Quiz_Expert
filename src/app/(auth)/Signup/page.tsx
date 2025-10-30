"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Signup() {
  const [preview, setPreview] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ Image Preview Handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  // ✅ Signup Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const imageFile = (
      document.getElementById("imageUpload") as HTMLInputElement
    )?.files?.[0];

    if (imageFile) {
      formData.append("profileImage", imageFile);
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        alert("✅ Account created successfully!");
        form.reset();
        setPreview(null);
        window.location.href = "/login";
      } else {
        alert("❌ " + result.message);
      }
    } catch (error: any) {
      alert("❌ " + error.message);
    }
  };

  if (!isMounted) {
    return (
      <main className="flex min-h-screen flex-col lg:flex-row bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
        <section className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden min-h-screen">
          <div className="absolute w-[300px] h-[300px] xl:w-[500px] xl:h-[500px] rounded-full bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-500 blur-3xl opacity-30" />
          <div className="z-10 text-center px-6 max-w-lg">
            <h1 className="text-3xl xl:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 leading-tight">
              Welcome to Expert Academy
            </h1>
            <p className="text-gray-300 text-sm xl:text-lg leading-relaxed">
              Learn. Grow. Achieve your dream career with the power of smart
              education.
            </p>
          </div>
        </section>

        <section className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 lg:py-10 min-h-screen lg:min-h-0">
          <div className="backdrop-blur-xl bg-white/10 p-5 sm:p-7 lg:p-8 xl:p-10 rounded-2xl shadow-xl border border-white/20 w-full max-w-[90%] sm:max-w-md lg:max-w-lg xl:max-w-xl">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-center">
              Create an Account
            </h1>
            <p className="text-gray-400 text-center mb-5 sm:mb-6 text-xs sm:text-sm lg:text-base">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Log in
              </Link>
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:gap-4 lg:gap-5"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="w-full h-full rounded-full object-cover border-2 border-blue-500 shadow-md"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-[#2e2e2e] flex items-center justify-center text-gray-400 border border-gray-600 text-xs sm:text-sm">
                      No Image
                    </div>
                  )}
                  <label
                    htmlFor="imageUpload"
                    className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm p-1.5 sm:p-2 rounded-full cursor-pointer shadow-lg transition-all duration-200"
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

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 lg:gap-4">
                <input
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  className="flex-1 p-2.5 sm:p-3 lg:p-3.5 rounded-lg bg-[#2e2e2e] text-xs sm:text-sm lg:text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
                  required
                />
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  className="flex-1 p-2.5 sm:p-3 lg:p-3.5 rounded-lg bg-[#2e2e2e] text-xs sm:text-sm lg:text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
                  required
                />
              </div>

              <input
                name="email"
                type="email"
                placeholder="Email (Optional)"
                className="p-2.5 sm:p-3 lg:p-3.5 rounded-lg bg-[#2e2e2e] text-xs sm:text-sm lg:text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
              />

              <input
                name="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className="w-full p-2.5 sm:p-3 lg:p-3.5 rounded-lg bg-[#2e2e2e] text-xs sm:text-sm lg:text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
                required
              />

              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="p-2.5 sm:p-3 lg:p-3.5 rounded-lg bg-[#2e2e2e] text-xs sm:text-sm lg:text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
                required
              />

              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold p-2.5 sm:p-3 lg:p-3.5 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20 text-xs sm:text-sm lg:text-base mt-2"
              >
                Create Account
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col lg:flex-row bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      {/* ---------- LEFT SIDE (Hero) ---------- */}
      <section className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden min-h-screen">
        {/* Soft glowing animated background circle */}
        <motion.div
          className="absolute w-[300px] h-[300px] xl:w-[500px] xl:h-[500px] rounded-full bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-500 blur-3xl opacity-30"
          animate={{ scale: [1, 1.08, 1], rotate: [0, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="z-10 text-center px-6 max-w-lg"
        >
          <h1 className="text-3xl xl:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 leading-tight">
            Welcome to Expert Academy
          </h1>
          <p className="text-gray-300 text-sm xl:text-lg leading-relaxed">
            Learn. Grow. Achieve your dream career with the power of smart
            education.
          </p>
        </motion.div>
      </section>

      {/* ---------- RIGHT SIDE (Form) ---------- */}
      <section className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 lg:py-10 min-h-screen lg:min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="backdrop-blur-xl bg-white/10 p-5 sm:p-7 lg:p-8 xl:p-10 rounded-2xl shadow-xl border border-white/20 w-full max-w-[90%] sm:max-w-md lg:max-w-lg xl:max-w-xl"
        >
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-center">
            Create an Account
          </h1>
          <p className="text-gray-400 text-center mb-5 sm:mb-6 text-xs sm:text-sm lg:text-base">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Log in
            </Link>
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:gap-4 lg:gap-5"
          >
            {/* Image Upload */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-full h-full rounded-full object-cover border-2 border-blue-500 shadow-md"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-[#2e2e2e] flex items-center justify-center text-gray-400 border border-gray-600 text-xs sm:text-sm">
                    No Image
                  </div>
                )}
                <label
                  htmlFor="imageUpload"
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm p-1.5 sm:p-2 rounded-full cursor-pointer shadow-lg transition-all duration-200"
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

            {/* Name Fields */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 lg:gap-4">
              <input
                name="firstName"
                type="text"
                placeholder="First name"
                className="flex-1 p-2.5 sm:p-3 lg:p-3.5 rounded-lg bg-[#2e2e2e] text-xs sm:text-sm lg:text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
                required
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last name"
                className="flex-1 p-2.5 sm:p-3 lg:p-3.5 rounded-lg bg-[#2e2e2e] text-xs sm:text-sm lg:text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
                required
              />
            </div>

            {/* Email */}
            <input
              name="email"
              type="email"
              placeholder="Email (Optional)"
              className="p-2.5 sm:p-3 lg:p-3.5 rounded-lg bg-[#2e2e2e] text-xs sm:text-sm lg:text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
            />

            {/* Phone Number */}
            <input
              name="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              className="w-full p-2.5 sm:p-3 lg:p-3.5 rounded-lg bg-[#2e2e2e] text-xs sm:text-sm lg:text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
              required
            />

            {/* Password */}
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="p-2.5 sm:p-3 lg:p-3.5 rounded-lg bg-[#2e2e2e] text-xs sm:text-sm lg:text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
              required
            />

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold p-2.5 sm:p-3 lg:p-3.5 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20 text-xs sm:text-sm lg:text-base mt-2"
            >
              Create Account
            </motion.button>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
