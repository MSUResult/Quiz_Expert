"use client"; // This is essential for using hooks like useState and useRouter

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLock } from "react-icons/fa";

// IMPORTANT: Never store real passwords in your frontend code.
// This is for demonstration only. Use a proper authentication system.
const ADMIN_PASSWORD = "1234";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from reloading the page

    if (password === ADMIN_PASSWORD) {
      // Correct password, redirect to the dashboard
      setError("");
      // In a real app, you would set a cookie or session here for authentication
      router.push("/admin/dashboard");
    } else {
      // Incorrect password, show an error
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    // Main container with a subtle gradient background
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen flex items-center justify-center p-4">
      {/* Wrapper for the gradient border effect */}
      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-purple-600 via-blue-500 to-purple-700 p-px shadow-2xl shadow-purple-900/20">
        <form
          onSubmit={handleLogin}
          className="bg-gray-900 rounded-[15px] p-8 sm:p-10 flex flex-col items-center gap-5"
        >
          {/* Styled icon container */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 border border-gray-700 mb-2">
            <FaLock size={28} className="text-purple-400" />
          </div>

          <h1 className="text-3xl font-bold tracking-tighter">Admin Access</h1>
          <p className="text-gray-400 text-center text-sm">
            Enter your 4-digit password to continue
          </p>

          <input
            type="password"
            placeholder="****"
            maxLength={4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 border-2 border-gray-700 text-white text-center text-2xl tracking-[1.5em] py-3 px-4 rounded-lg focus:outline-none focus:border-purple-500 transition-colors duration-300 placeholder:tracking-normal"
          />

          {error && (
            <p className="text-red-400 text-sm font-medium mt-1">{error}</p>
          )}

          <button
            type="submit"
            className="w-full p-3 mt-4 rounded-lg font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transform hover:scale-[1.02] transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 shadow-lg shadow-purple-900/30"
          >
            Access Admin Panel
          </button>
        </form>
      </div>
    </div>
  );
}
