"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GiIndianPalace } from "react-icons/gi";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrorMessage(errorData.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("✅ Server response:", data);

      // Redirect to homepage
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
      {/* Left Section - Image */}
      <section className="hidden md:flex flex-1 relative rounded-[20px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1514241516423-6c0a5e031aa2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1374"
          alt="sunrise"
          fill
          className="object-cover brightness-90 hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold tracking-wide text-center px-4">
            Welcome Back 🌅
          </h1>
        </div>
      </section>

      {/* Right Section - Form */}
      <section className="flex-1 flex flex-col justify-center items-center bg-white rounded-none md:rounded-r-[20px] shadow-2xl px-6 sm:px-8 py-10">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-10 max-w-sm">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            UNISOCIAL
          </h1>
          <div className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100 transition">
            <GiIndianPalace className="text-xl text-pink-500" />
            <span className="text-sm font-medium">IND</span>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-8 max-w-sm">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Hi, Learners 🎨
          </h2>
          <p className="text-gray-500">
            Welcome to UNISOCIAL — log in to continue
          </p>
        </div>

        {/* Form */}
        <form
          className="w-full max-w-sm flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 rounded-xl transition ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:from-pink-600 hover:to-purple-600"
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <div className="flex items-center justify-center gap-2 my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button
            type="button"
            className="w-full border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            Continue with Google
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-8 text-center">
          Don’t have an account?{" "}
          <a
            href="/Signup"
            className="text-pink-500 hover:underline font-medium"
          >
            Sign up
          </a>
        </p>
      </section>
    </main>
  );
};

export default Login;
