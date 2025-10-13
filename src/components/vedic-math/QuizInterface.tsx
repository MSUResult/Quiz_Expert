"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { FiClock, FiCheckCircle } from "react-icons/fi";

export default function QuizInterface({ chapter }) {
  const router = useRouter(); // Initialize the router
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(chapter.timeEstimate * 60);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const questions = chapter.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  // Timer effect
  useEffect(() => {
    // Stop the timer if the quiz is finished or time is up
    if (timeLeft <= 0 || isQuizFinished) {
      if (timeLeft <= 0 && !isQuizFinished) {
        // Automatically submit if time runs out
        handleSubmit();
      }
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isQuizFinished]);

  const handleSelectOption = (option) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: option,
    });
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < totalQuestions) {
      setCurrentQuestionIndex(index);
    }
  };

  const handleSubmit = () => {
    setIsQuizFinished(true); // Stop the timer and UI updates

    // Create a results object to store in localStorage
    const resultsToStore = {
      chapterId: chapter._id,
      chapterTitle: chapter.title,
      userAnswers: answers,
      totalQuestions: totalQuestions,
    };

    // Use localStorage to pass data to the results page
    localStorage.setItem("quizResults", JSON.stringify(resultsToStore));

    // Redirect to the results page
    router.push(`/vedic-math/results/${chapter._id}`);
  };

  const progress = (Object.keys(answers).length / totalQuestions) * 100;
  const allQuestionsAnswered = Object.keys(answers).length === totalQuestions;

  return (
    <div className="min-h-screen bg-[#111827] flex justify-center py-12 px-4">
      <div className="w-full max-w-4xl bg-[#1F2937] text-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-700">
        {/* ... Header and Question Body remain the same ... */}
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-100">
              {chapter.title}
            </h1>
            <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-md text-sm">
              <FiClock className="text-purple-400" />
              <span>
                {`${Math.floor(timeLeft / 60)}`.padStart(2, "0")}:
                {`${timeLeft % 60}`.padStart(2, "0")}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </p>
          <div className="w-full bg-gray-600 rounded-full h-2 mt-4">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        {/* Question Body */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
          <h2 className="text-lg font-semibold leading-relaxed mb-6">
            {currentQuestion.questionText}
          </h2>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                /* ... existing button code ... */ onClick={() =>
                  handleSelectOption(option)
                }
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center gap-4 ${
                  answers[currentQuestionIndex] === option
                    ? "bg-purple-500/20 border-purple-500"
                    : "bg-gray-700/50 border-gray-600 hover:border-purple-400"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    answers[currentQuestionIndex] === option
                      ? "border-purple-500 bg-purple-500"
                      : "border-gray-400"
                  }`}
                >
                  {answers[currentQuestionIndex] === option && (
                    <FiCheckCircle size={14} />
                  )}
                </div>
                <span>{option}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => goToQuestion(currentQuestionIndex - 1)}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-2 font-semibold rounded-md bg-gray-600 hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          {currentQuestionIndex === totalQuestions - 1 ? (
            // Show Submit button on the last question
            <button
              onClick={handleSubmit}
              disabled={!allQuestionsAnswered}
              className="px-8 py-2 font-bold rounded-md bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => goToQuestion(currentQuestionIndex + 1)}
              disabled={currentQuestionIndex === totalQuestions - 1}
              className="px-8 py-2 font-semibold rounded-md bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          )}
        </div>

        {/* Warning Message */}
        {!allQuestionsAnswered && (
          <div className="mt-6 text-center p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-yellow-300">
              Please answer all questions before submitting the quiz. You have{" "}
              {totalQuestions - Object.keys(answers).length} unanswered
              questions remaining.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
