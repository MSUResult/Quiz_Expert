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
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      // optional now, not required
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"], // make it required
      unique: true,
      trim: true,
      sparse: true,
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
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Remove duplicate email index warning: keep only unique in field
// UserSchema.index({ email: 1 }, { unique: true }); // removed

const User = models.User || mongoose.model("User", UserSchema);
export default User;
