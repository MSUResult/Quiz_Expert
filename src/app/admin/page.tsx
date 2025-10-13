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
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-8 flex flex-col items-center gap-4"
      >
        <div className="text-purple-400 mb-2">
          <FaLock size={24} />
        </div>
        <h1 className="text-2xl font-bold">Admin Access</h1>
        <p className="text-gray-400 text-center">
          Enter your 4-digit password to continue
        </p>
        <input
          type="password"
          placeholder="Enter 4-digit password"
          maxLength={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 text-white text-center py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          type="submit"
          className="bg-purple-600 text-white w-full p-3 rounded-md font-semibold hover:bg-purple-700 transition-colors mt-4"
        >
          Access Admin Panel
        </button>
      </form>
    </div>
  );
}
