"use client";
import React, { useState, useEffect } from "react";
import { FaUsers, FaClipboardList, FaStar } from "react-icons/fa";

export default function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAttempts: 0,
    overallAverageScore: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/users");
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data = await response.json();
        setUsers(data.users);

        // --- Calculate Overall Stats ---
        const totalUsers = data.users.length;
        const totalAttempts = data.users.reduce(
          (sum, user) => sum + user.quizzesPlayed,
          0
        );
        const usersWhoPlayed = data.users.filter((u) => u.quizzesPlayed > 0);
        const sumOfAverages = usersWhoPlayed.reduce(
          (sum, user) => sum + user.averageScore,
          0
        );
        const overallAverageScore =
          usersWhoPlayed.length > 0
            ? Math.round(sumOfAverages / usersWhoPlayed.length)
            : 0;

        setStats({ totalUsers, totalAttempts, overallAverageScore });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex justify-center items-center">
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-red-400 flex justify-center items-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
        Dashboard Overview
      </h1>
      <p className="text-gray-400 mb-10">Welcome to the Admin Dashboard 👋</p>

      {/* Dashboard Stat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex justify-between items-center bg-gradient-to-br from-purple-900 to-purple-600 p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-300">Total Users</p>
            <h1 className="text-3xl font-bold">{stats.totalUsers}</h1>
          </div>
          <span className="text-4xl text-purple-300">
            <FaUsers />
          </span>
        </div>
        <div className="flex justify-between items-center bg-gradient-to-br from-pink-900 to-pink-600 p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-300">Total Quiz Attempts</p>
            <h1 className="text-3xl font-bold">{stats.totalAttempts}</h1>
          </div>
          <span className="text-4xl text-pink-300">
            <FaClipboardList />
          </span>
        </div>
        <div className="flex justify-between items-center bg-gradient-to-br from-green-900 to-green-600 p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-300">Overall Average Score</p>
            <h1 className="text-3xl font-bold">{stats.overallAverageScore}%</h1>
          </div>
          <span className="text-4xl text-green-300">
            <FaStar />
          </span>
        </div>
      </section>

      {/* Users Table */}
      <section className="mt-12 bg-[#1e2d3b] rounded-2xl shadow-lg border border-gray-700/50">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-200">User Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-800/30 text-xs text-gray-300 uppercase tracking-wider">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Email</th>
                {/* ✅ NEW: Table header for Phone Number */}
                <th className="p-4">Phone Number</th>
                <th className="p-4 text-center">Quizzes Played</th>
                <th className="p-4 text-center">Average Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-800/50 transition-colors"
                >
                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={user.profileImage}
                      alt={`${user.firstName}'s profile`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400">{user.email || "N/A"}</td>
                  {/* ✅ NEW: Table cell to display the phone number */}
                  <td className="p-4 text-gray-400">{user.phoneNumber}</td>
                  <td className="p-4 text-center font-semibold">
                    {user.quizzesPlayed}
                  </td>
                  <td className="p-4 text-center font-bold text-lg">
                    {user.averageScore}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <p className="text-center text-gray-500 py-8">No users found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
