"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaPercentage,
  FaClipboardList,
  FaDownload,
} from "react-icons/fa";
import { handleDownloadCertificate } from "../../utils/downloadCertificate";

// Helper function to determine grade based on score (no changes here)
const getGrade = (score) => {
  if (score >= 90) return { grade: "A", color: "text-green-400" };
  if (score >= 80) return { grade: "B", color: "text-blue-400" };
  if (score >= 70) return { grade: "C", color: "text-yellow-400" };
  if (score >= 60) return { grade: "D", color: "text-orange-400" };
  return { grade: "F", color: "text-red-400" };
};

export default function ResultsDisplay({ chapter }) {
  const [results, setResults] = useState(null);
  const [isScoreSaved, setIsScoreSaved] = useState(false);

  // ✅ DYNAMIC USERNAME: State for the user's name
  const [userName, setUserName] = useState("Quiz Taker"); // A default value

  // This effect calculates results AND gets user data from localStorage
  useEffect(() => {
    // ✅ DYNAMIC USERNAME: Try to get user info from localStorage.
    // Your login page should save this after a successful login.
    // Example: localStorage.setItem('user', JSON.stringify(data.user));
    const storedUserJSON = localStorage.getItem("user");
    if (storedUserJSON) {
      const storedUser = JSON.parse(storedUserJSON);
      // Assuming the user object has firstName and lastName
      setUserName(`${storedUser.firstName || ""}`.trim());
    }

    const storedResultsJSON = localStorage.getItem("quizResults");
    if (storedResultsJSON) {
      const storedResults = JSON.parse(storedResultsJSON);

      if (storedResults.chapterId === chapter._id) {
        let correctCount = 0;
        chapter.questions.forEach((question, index) => {
          if (storedResults.userAnswers[index] === question.correctAnswer) {
            correctCount++;
          }
        });

        const score = (correctCount / chapter.questions.length) * 100;
        const gradeInfo = getGrade(score);

        setResults({
          ...storedResults,
          correct: correctCount,
          incorrect: chapter.questions.length - correctCount,
          score: Math.round(score),
          grade: gradeInfo.grade,
          gradeColor: gradeInfo.color,
        });
      }
    }
  }, [chapter]);

  // ✅ SAVE SCORE TO DB: This effect calls the API to save the score.
  useEffect(() => {
    // Only run if results are calculated and we haven't tried to save yet
    if (results && !isScoreSaved) {
      const saveScore = async () => {
        try {
          // The API knows who the user is from the cookie.
          // We only need to send the quiz data.
          const response = await fetch("/api/quiz/save-score", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chapterId: chapter._id,
              score: results.score,
            }),
          });

          setIsScoreSaved(true); // Mark as attempted to prevent re-sends

          if (response.ok) {
            console.log("Score saved successfully!");
          } else {
            const data = await response.json();
            console.error("Failed to save score:", data.message || data.error);
          }
        } catch (error) {
          console.error(
            "An error occurred while calling the save-score API:",
            error
          );
        }
      };

      saveScore();
    }
  }, [results, isScoreSaved, chapter._id]);

  if (!results) {
    return <div className="text-white text-center">Loading results...</div>;
  }

  // Your entire JSX return statement remains exactly the same.
  // The only change is that `userName` is now a state variable.
  return (
    <div className="max-w-4xl mx-auto text-white">
      {/* Top Section */}
      <div className="text-center p-8 bg-[#1F2937] border border-gray-700 rounded-lg">
        <h1 className="text-4xl font-bold">Quiz Complete!</h1>
        <p className="text-gray-400 mt-2">{results.chapterTitle}</p>
        <p className="text-6xl font-extrabold mt-4">{results.score}%</p>
        <p className="mt-2 text-gray-300">Keep practicing, you'll improve!</p>
        <div
          className={`mt-4 inline-block px-4 py-1 font-bold rounded-md bg-red-600/50 border border-red-500 ${results.gradeColor}`}
        >
          Grade: {results.grade}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-[#1F2937] p-4 rounded-lg text-center border border-gray-700">
          <FaCheckCircle className="mx-auto text-green-500 text-3xl mb-2" />
          <p className="text-2xl font-bold">{results.correct}</p>
          <p className="text-sm text-gray-400">Correct</p>
        </div>
        <div className="bg-[#1F2937] p-4 rounded-lg text-center border border-gray-700">
          <FaTimesCircle className="mx-auto text-red-500 text-3xl mb-2" />
          <p className="text-2xl font-bold">{results.incorrect}</p>
          <p className="text-sm text-gray-400">Incorrect</p>
        </div>
        <div className="bg-[#1F2937] p-4 rounded-lg text-center border border-gray-700">
          <FaPercentage className="mx-auto text-purple-500 text-3xl mb-2" />
          <p className="text-2xl font-bold">{results.score}%</p>
          <p className="text-sm text-gray-400">Score</p>
        </div>
        <div className="bg-[#1F2937] p-4 rounded-lg text-center border border-gray-700">
          <FaClipboardList className="mx-auto text-blue-500 text-3xl mb-2" />
          <p className={`text-2xl font-bold ${results.gradeColor}`}>
            {results.grade}
          </p>
          <p className="text-sm text-gray-400">Grade</p>
        </div>
      </div>

      {/* Question Review Section */}
      <div className="mt-10 bg-[#1F2937] border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Question Review</h2>
        <div className="space-y-6">
          {chapter.questions.map((question, index) => {
            const userAnswer = results.userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            return (
              <div
                key={index}
                className={`p-4 rounded-md border ${
                  isCorrect
                    ? "bg-green-500/10 border-green-500/30"
                    : "bg-red-500/10 border-red-500/30"
                }`}
              >
                <p className="font-semibold">
                  {index + 1}. {question.questionText}
                </p>
                <div className="mt-3 text-sm">
                  <p>
                    Your answer:{" "}
                    <span
                      className={`font-medium ${
                        isCorrect ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {userAnswer || "Not Answered"}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p>
                      Correct answer:{" "}
                      <span className="font-medium text-green-400">
                        {question.correctAnswer}
                      </span>
                    </p>
                  )}
                  <p className="text-gray-400 mt-2">
                    Explanation: {question.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => handleDownloadCertificate(results, userName)}
          className="px-6 py-2 font-semibold rounded-md bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FaDownload />
          Download Result
        </button>

        <Link href={`/vedic-math/quiz/${chapter._id}`}>
          <button className="px-6 py-2 font-semibold rounded-md bg-gray-600 hover:bg-gray-500 transition-colors">
            Retake Quiz
          </button>
        </Link>
        <button className="px-6 py-2 font-semibold rounded-md bg-purple-600 hover:bg-purple-700 transition-colors">
          Next Chapter
        </button>
        <Link href="/vedic-math">
          <button className="px-6 py-2 font-semibold rounded-md bg-gray-600 hover:bg-gray-500 transition-colors">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
