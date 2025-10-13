import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    // ✅ NEW FIELD
    phoneNumber: {
      type: String,
      unique: true,
      trim: true,
      sparse: true, // Also sparse, for users signing up with email.
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

    // 🧠 QUIZ-RELATED FIELDS - REVISED FOR CLARITY
    quizHistory: [
      {
        // ID of the chapter the quiz was played for
        chapterId: {
          type: Schema.Types.ObjectId,
          ref: "Chapter", // assumes you have a Chapter model
          required: true,
        },
        // Score on that attempt (required)
        score: {
          type: Number,
          required: true,
        },
        // Date of the attempt
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Aggregate fields (update these when saving a new score)
    totalScore: {
      type: Number,
      default: 0,
    },
    quizzesPlayed: {
      type: Number,
      default: 0,
    },
    bestScore: {
      type: Number,
      default: 0,
    },
    lastPlayed: {
      type: Date,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Ensure unique email index
UserSchema.index({ email: 1 }, { unique: true });

// If already compiled (hot reload), reuse it
const User = models.User || mongoose.model("User", UserSchema);
export default User;
