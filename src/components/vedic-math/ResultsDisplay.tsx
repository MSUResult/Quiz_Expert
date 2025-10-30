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

// Helper function to determine grade based on score
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
  const [userName, setUserName] = useState("Quiz Taker");

  useEffect(() => {
    const storedUserJSON = localStorage.getItem("user");
    if (storedUserJSON) {
      const storedUser = JSON.parse(storedUserJSON);
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

  useEffect(() => {
    if (results && !isScoreSaved) {
      const saveScore = async () => {
        try {
          const response = await fetch("/api/quiz/save-score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chapterId: chapter._id,
              score: results.score,
            }),
          });

          setIsScoreSaved(true);
          if (!response.ok) {
            const data = await response.json();
            console.error("Failed to save score:", data.message || data.error);
          }
        } catch (error) {
          console.error("Error saving score:", error);
        }
      };

      saveScore();
    }
  }, [results, isScoreSaved, chapter._id]);

  if (!results) {
    return (
      <div className="text-white text-center mt-10">Loading results...</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto text-white px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Section */}
      <div className="text-center p-6 sm:p-8 bg-[#1F2937] border border-gray-700 rounded-xl shadow-md">
        <h1 className="text-3xl sm:text-4xl font-bold">Quiz Complete!</h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          {results.chapterTitle}
        </p>
        <p className="text-5xl sm:text-6xl font-extrabold mt-4">
          {results.score}%
        </p>
        <p className="mt-2 text-gray-300 text-sm sm:text-base">
          Keep practicing, you'll improve!
        </p>
        <div
          className={`mt-4 inline-block px-4 py-1 font-bold rounded-md border ${results.gradeColor} border-opacity-50 bg-gray-700/50`}
        >
          Grade: {results.grade}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
        <div className="bg-[#1F2937] p-4 rounded-lg text-center border border-gray-700">
          <FaCheckCircle className="mx-auto text-green-500 text-2xl sm:text-3xl mb-2" />
          <p className="text-xl sm:text-2xl font-bold">{results.correct}</p>
          <p className="text-xs sm:text-sm text-gray-400">Correct</p>
        </div>
        <div className="bg-[#1F2937] p-4 rounded-lg text-center border border-gray-700">
          <FaTimesCircle className="mx-auto text-red-500 text-2xl sm:text-3xl mb-2" />
          <p className="text-xl sm:text-2xl font-bold">{results.incorrect}</p>
          <p className="text-xs sm:text-sm text-gray-400">Incorrect</p>
        </div>
        <div className="bg-[#1F2937] p-4 rounded-lg text-center border border-gray-700">
          <FaPercentage className="mx-auto text-purple-500 text-2xl sm:text-3xl mb-2" />
          <p className="text-xl sm:text-2xl font-bold">{results.score}%</p>
          <p className="text-xs sm:text-sm text-gray-400">Score</p>
        </div>
        <div className="bg-[#1F2937] p-4 rounded-lg text-center border border-gray-700">
          <FaClipboardList className="mx-auto text-blue-500 text-2xl sm:text-3xl mb-2" />
          <p className={`text-xl sm:text-2xl font-bold ${results.gradeColor}`}>
            {results.grade}
          </p>
          <p className="text-xs sm:text-sm text-gray-400">Grade</p>
        </div>
      </div>

      {/* Question Review Section */}
      <div className="mt-10 bg-[#1F2937] border border-gray-700 rounded-lg p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
          Question Review
        </h2>
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
                <p className="font-semibold text-sm sm:text-base">
                  {index + 1}. {question.questionText}
                </p>
                <div className="mt-2 text-xs sm:text-sm">
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
      <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
        <button
          onClick={() => handleDownloadCertificate(results, userName)}
          className="px-6 py-2 w-full sm:w-auto font-semibold rounded-md bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <FaDownload /> Download Result
        </button>

        <Link
          href={`/vedic-math/quiz/${chapter._id}`}
          className="w-full sm:w-auto"
        >
          <button className="w-full sm:w-auto px-6 py-2 font-semibold rounded-md bg-gray-600 hover:bg-gray-500 transition-colors">
            Retake Quiz
          </button>
        </Link>

        <button className="px-6 py-2 w-full sm:w-auto font-semibold rounded-md bg-purple-600 hover:bg-purple-700 transition-colors">
          Next Chapter
        </button>

        <Link href="/vedic-math" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto px-6 py-2 font-semibold rounded-md bg-gray-600 hover:bg-gray-500 transition-colors">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
