import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    // --- CHANGE 1: REMOVED all inline index properties like 'sparse' ---
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true, // This is correct, phone number must always be unique
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    profileImage: {
      type: String,
      default:
        "https://res.cloudinary.com/demo/image/upload/v1690000000/default-avatar.png",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // --- Other fields remain unchanged ---
    quizHistory: [
      {
        chapterId: {
          type: Schema.Types.ObjectId,
          ref: "Chapter",
          required: true,
        },
        score: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    totalScore: { type: Number, default: 0 },
    quizzesPlayed: { type: Number, default: 0 },
    bestScore: { type: Number, default: 0 },
    lastPlayed: { type: Date },
  },
  { timestamps: true }
);

// --- CHANGE 2: DEFINED a proper sparse index for email ---
// This tells MongoDB: "The email field must be unique, but ONLY for documents that have it."
// This is the correct way to allow multiple users to have a null/missing email.
UserSchema.index({ email: 1 }, { unique: true, sparse: true });

const User = models.User || mongoose.model("User", UserSchema);
export default User;