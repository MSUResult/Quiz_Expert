"use client";
import React, { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");

  const getInfo = async () => {
    try {
      const data = await fetch("/api/me");
      const res = await data.json();
      if (res.success) {
        setUser(res.user);
        setFirstName(res.user.firstName);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const averageScore =
    user && user.quizzesPlayed > 0
      ? (user.totalScore / user.quizzesPlayed).toFixed(2)
      : 0;

  const handleNameUpdate = async () => {
    try {
      const response = await fetch("/api/updateName", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName }),
      });
      const res = await response.json();
      if (res.success) {
        setUser((prev) => ({ ...prev, firstName }));
        setEditMode(false);
      }
    } catch (err) {
      console.error("Failed to update name:", err);
    }
  };

  if (!user)
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#1e1e1e] text-white">
        <p>Loading profile...</p>
      </main>
    );

  return (
    <main className="min-h-screen bg-[#1e1e1e] text-white flex flex-col items-center py-10 px-4">
      {/* Profile Header */}
      <section className="w-full max-w-3xl bg-[#2b2b2b] rounded-2xl p-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <img
            src={user.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-600"
          />
          <div>
            {editMode ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-gray-700 px-2 py-1 rounded text-white focus:outline-none"
                />
                <button
                  onClick={handleNameUpdate}
                  className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-600 px-3 py-1 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <h1 className="text-2xl font-semibold">
                {user.firstName} {user.lastName}
              </h1>
            )}
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>

        <button
          onClick={() => setEditMode(!editMode)}
          className="px-4 py-2 bg-[#000000] hover:bg-gray-700 rounded-[25px]"
        >
          Edit Name
        </button>
      </section>

      {/* Stats Section */}
      <section className="w-full max-w-3xl mt-8 bg-[#2b2b2b] rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center shadow-lg">
        <div className="bg-[#1e1e1e] p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Score</h2>
          <p className="text-2xl font-bold text-blue-400">{user.totalScore}</p>
        </div>
        <div className="bg-[#1e1e1e] p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Best Score</h2>
          <p className="text-2xl font-bold text-green-400">{user.bestScore}</p>
        </div>
        <div className="bg-[#1e1e1e] p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Quizzes Played</h2>
          <p className="text-2xl font-bold text-yellow-400">
            {user.quizzesPlayed}
          </p>
        </div>
        <div className="bg-[#1e1e1e] p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Average Score</h2>
          <p className="text-2xl font-bold text-purple-400">{averageScore}</p>
        </div>
      </section>

      {/* Sign Out Button */}
      <button className="mt-10 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-[25px] shadow-md">
        Sign Out
      </button>
    </main>
  );
};

export default Profile;
