"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GiIndianPalace } from "react-icons/gi";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.target as HTMLFormElement);
    const phoneNumber = formData.get("phoneNumber")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrorMessage(
          errorData.message || "Invalid phone number or password"
        );
        setLoading(false);
        return;
      }

      router.push("/");
    } catch (error) {
      console.error("❌ Error logging in:", error);
      setErrorMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row bg-gray-100">
      {/* Left Section - Image/Brand section */}
      <section className="hidden md:flex flex-1 relative rounded-[20px] overflow-hidden items-center justify-center bg-gradient-to-br from-pink-300 to-purple-400">
        <div className="text-white text-center">
          <GiIndianPalace className="text-6xl mb-4 mx-auto" />
          <h2 className="text-3xl font-bold">Welcome to Our Platform</h2>
          <p className="mt-2 text-lg">
            Empowering Saharanpur with digital growth 🚀
          </p>
        </div>
      </section>

      {/* Right Section - Login Form */}
      <section className="flex-1 flex flex-col justify-center items-center bg-white rounded-none md:rounded-r-[20px] shadow-2xl px-6 sm:px-8 py-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Login</h1>
          <p className="text-gray-500 mt-2">
            Welcome back! Please log in to your account
          </p>
        </div>

        <form
          className="w-full max-w-sm flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          {/* Phone Number Field */}
          <input
            type="tel"
            placeholder="Phone Number"
            name="phoneNumber"
            required
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          {/* Password Field */}
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <span className="h-[1px] bg-gray-300 w-1/3"></span>
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <span className="h-[1px] bg-gray-300 w-1/3"></span>
          </div>

          {/* Example Placeholder Buttons */}
          <button
            type="button"
            className="border border-gray-300 hover:bg-gray-100 py-3 rounded-xl text-gray-700 font-medium transition"
          >
            Continue with Google
          </button>
        </form>

        <p className="text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <a
            href="/Signup"
            className="text-pink-500 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>

        <Link
          href={"/forgetPassword"}
          className="text-blue-800 hover:text-gray-600 mt-4 "
        >
          Forget Pasword
        </Link>
      </section>
    </main>
  );
};

export default Login;
