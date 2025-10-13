// pages/admin/questions.jsx (or your file path)
"use client";
import AddChapterForm from "@/components/NewQuestion"; // Renamed for clarity
import React, { useState, useRef } from "react";
import { FaUserPlus, FaUpload } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast"; // A great library for notifications

const Questions = () => {
  const [open, setOpen] = useState(false);
  // Create a ref to access the hidden file input element
  const fileInputRef = useRef(null);

  // This function now receives a full chapter object from the form
  const handleAddChapter = async (newChapterData) => {
    console.log("✅ Received Chapter Data:", newChapterData);
    const toastId = toast.loading("Adding new chapter...");

    try {
      const response = await fetch("/api/chapters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newChapterData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add chapter");
      }

      toast.success("Chapter added successfully!", { id: toastId });
      setOpen(false); // Close form after successful submission
    } catch (error) {
      console.error("Error adding chapter:", error);
      toast.error(error.message, { id: toastId });
    }
  };

  // This function handles reading the uploaded JSON file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const toastId = toast.loading("Uploading and processing file...");
      try {
        const content = e.target.result;
        const data = JSON.parse(content);

        // Send the parsed data to our backend API for bulk upload
        const response = await fetch("/api/chapters/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Upload failed");
        }

        toast.success(
          `Upload complete! Inserted: ${result.inserted}, Updated: ${result.updated}`,
          { id: toastId }
        );
      } catch (error) {
        console.error("Error processing JSON file:", error);
        toast.error(`Error: ${error.message}`, { id: toastId });
      }
    };

    reader.readAsText(file);
    event.target.value = null; // Reset input to allow re-uploading the same file
  };

  // This function is called when the "Upload JSON" button is clicked
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <main>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Questions Management</h1>
          <p className="text-gray-400">Add, edit, or upload quiz questions</p>
        </div>
        <div className="flex gap-5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            style={{ display: "none" }} // The input is hidden
          />
          <button
            onClick={handleUploadClick}
            className="text-xl font-bold border border-white flex items-center px-3 py-2 rounded-lg gap-3 hover:bg-purple-800 transition-colors"
          >
            <FaUpload />
            Upload JSON
          </button>
          <button
            className="text-xl font-bold bg-purple-600 flex items-center px-3 py-2 rounded-lg gap-3 hover:bg-purple-700 transition-colors"
            onClick={() => setOpen(true)}
          >
            <FaUserPlus />
            Add Chapter
          </button>
        </div>
      </div>

      {open && (
        <AddChapterForm
          onSubmit={handleAddChapter}
          onCancel={() => setOpen(false)}
        />
      )}
    </main>
  );
};

export default Questions;
