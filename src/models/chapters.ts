import mongoose, { Schema, models } from "mongoose";

// A sub-schema for the questions inside a chapter
const QuestionSchema = new Schema({
  questionText: { type: String, required: true },
  options: {
    type: [String],
    required: true,
    // You could add validation to ensure there are exactly 4 options
    validate: [
      (v) => Array.isArray(v) && v.length > 0,
      "At least one option is required",
    ],
  },
  correctAnswer: { type: String, required: true },
  explanation: { type: String },
});

const ChapterSchema = new Schema(
  {
    title: { type: String, required: [true, "Chapter title is required."] },
    chapterNumber: {
      type: Number,
      required: [true, "Chapter number is required."],
    },
    description: { type: String },
    category: {
      type: String,
      required: [true, "Category is required."],
      enum: ["Math", "GS"],
    },
    timeEstimate: { type: Number },
    questions: [QuestionSchema],
  },
  { timestamps: true }
); // timestamps adds createdAt and updatedAt fields automatically

// =================================================================
// THIS IS THE MOST IMPORTANT PART FOR PREVENTING DUPLICATES
// =================================================================
// We are telling MongoDB: "Create a unique index based on the
// combination of the 'category' field and the 'chapterNumber' field."
// If you try to insert a document where this combination already exists,
// MongoDB will throw a unique constraint error (code 11000).
ChapterSchema.index({ category: 1, chapterNumber: 1 }, { unique: true });

// Check if the model already exists before defining it
const Chapter = models.Chapter || mongoose.model("Chapter", ChapterSchema);

export default Chapter;
