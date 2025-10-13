// components/AddChapterForm.jsx
import React, { useState } from "react";

const AddChapterForm = ({ onSubmit, onCancel }) => {
  // We can manage multiple questions in state, but let's start with one for simplicity.
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      explanation: "",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    // Construct the final chapter object in the correct structure
    const chapterData = {
      title: data.get("title"),
      chapterNumber: parseInt(data.get("chapterNumber"), 10),
      description: data.get("description"),
      category: data.get("category"),
      timeEstimate: parseInt(data.get("timeEstimate"), 10),
      questions: [
        {
          questionText: data.get("questionText"),
          options: [
            data.get("option1"),
            data.get("option2"),
            data.get("option3"),
            data.get("option4"),
          ],
          correctAnswer: data.get("correctAnswer"),
          explanation: data.get("explanation"),
        },
        // If you add state to manage multiple questions, you'd map over them here.
      ],
    };

    // Validate that chapter number is a positive number
    if (isNaN(chapterData.chapterNumber) || chapterData.chapterNumber <= 0) {
      alert("Chapter Number must be a valid number greater than 0.");
      return;
    }

    onSubmit(chapterData); // Send the complete object to the parent
  };

  return (
    <div className="bg-[#111] text-white p-6 rounded-2xl mt-6 shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Chapter</h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Chapter Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-gray-300 font-semibold">
              Title
            </label>
            <input
              name="title"
              placeholder="e.g., Introduction to Math"
              required
              className="w-full bg-[#1e1e1e] border border-gray-700 p-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300 font-semibold">
              Category
            </label>
            <select
              name="category"
              className="w-full bg-[#1e1e1e] border border-gray-700 p-2 rounded-lg"
            >
              <option>Math</option>
              <option>GS</option> {/* Changed to match your JSON data */}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-gray-300 font-semibold">
              Chapter Number
            </label>
            <input
              name="chapterNumber"
              type="number"
              min="1"
              placeholder="e.g., 1"
              required
              className="w-full bg-[#1e1e1e] border border-gray-700 p-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300 font-semibold">
              Time Estimate (minutes)
            </label>
            <input
              name="timeEstimate"
              type="number"
              min="1"
              placeholder="e.g., 15"
              required
              className="w-full bg-[#1e1e1e] border border-gray-700 p-2 rounded-lg"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-gray-300 font-semibold">
            Description
          </label>
          <textarea
            name="description"
            placeholder="A brief description of the chapter"
            className="w-full bg-[#1e1e1e] border border-gray-700 p-2 rounded-lg h-24"
          />
        </div>

        <hr className="border-gray-700" />
        <h3 className="text-xl font-bold">Add First Question</h3>

        {/* Question Statement */}
        <div>
          <label className="block mb-1 text-gray-300 font-semibold">
            Question Statement
          </label>
          <textarea
            name="questionText"
            placeholder="Enter the question"
            required
            className="w-full bg-[#1e1e1e] border border-gray-700 p-2 rounded-lg h-24"
          />
        </div>

        {/* Options */}
        <div>
          <label className="block mb-2 text-gray-300 font-semibold">
            Options
          </label>
          <div className="space-y-3">
            {["option1", "option2", "option3", "option4"].map((name, index) => (
              <input
                key={index}
                name={name}
                placeholder={`Option ${index + 1}`}
                required
                className="w-full bg-[#1e1e1e] border border-gray-700 p-2 rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Correct Answer & Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-gray-300 font-semibold">
              Correct Answer
            </label>
            <input
              name="correctAnswer"
              placeholder="Copy the exact text of the correct option"
              required
              className="w-full bg-[#1e1e1e] border border-gray-700 p-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-300 font-semibold">
              Explanation
            </label>
            <input
              name="explanation"
              placeholder="Explain why this is the correct answer"
              className="w-full bg-[#1e1e1e] border border-gray-700 p-2 rounded-lg"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg font-semibold"
          >
            Add Chapter
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-600 hover:bg-gray-800 px-5 py-2 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddChapterForm;
