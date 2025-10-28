"use client";
import React, { useEffect, useState } from "react";
import { FaMedal, FaTrophy, FaUserCircle } from "react-icons/fa";

const LeaderBoard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setPlayers(data.leaderboard || []);
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#1e1e1e] text-white pt-24">
        <p className="animate-pulse text-lg">Loading Leaderboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1e1e1e] text-white py-10 px-4 pt-24">
      {/* 👆 pt-24 pushes content below fixed navbar (about 6rem space) */}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-yellow-400">
          Leaderboard
        </h1>
        <p className="text-center text-gray-400 mb-8">
          See how you rank against other QuizMaster users!
        </p>

        <div className="bg-[#2b2b2b] rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          {players.length === 0 ? (
            <p className="text-center text-gray-400 py-6">
              No players yet. Play your first quiz to appear here!
            </p>
          ) : (
            <ul className="divide-y divide-gray-700">
              {players.map((player, index) => (
                <li
                  key={player._id}
                  className={`flex items-center justify-between py-4 px-5 transition duration-200 ${
                    index === 0
                      ? "bg-gradient-to-r from-yellow-600/20 to-yellow-400/10"
                      : index === 1
                      ? "bg-gradient-to-r from-gray-500/20 to-gray-300/10"
                      : index === 2
                      ? "bg-gradient-to-r from-orange-500/20 to-orange-300/10"
                      : "hover:bg-gray-800/40"
                  }`}
                >
                  {/* Left: Rank + Avatar + Name */}
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-gray-300 w-8 text-center">
                      {index + 1}
                    </div>
                    {player.profileImage ? (
                      <img
                        src={player.profileImage}
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover border border-gray-500"
                      />
                    ) : (
                      <FaUserCircle className="w-12 h-12 text-gray-400" />
                    )}
                    <div>
                      <p className="font-semibold text-lg">
                        {player.firstName} {player.lastName}
                      </p>
                      <p className="text-sm text-gray-400">
                        Quizzes Played: {player.quizzesPlayed}
                      </p>
                    </div>
                  </div>

                  {/* Right: Score */}
                  <div className="flex items-center gap-2">
                    {index === 0 && (
                      <FaTrophy className="text-yellow-400 text-xl" />
                    )}
                    {index === 1 && (
                      <FaMedal className="text-gray-300 text-xl" />
                    )}
                    {index === 2 && (
                      <FaMedal className="text-orange-400 text-xl" />
                    )}
                    <p className="text-lg font-bold text-yellow-300">
                      {player.totalScore}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
};

export default LeaderBoard;
