import mongoose from "mongoose";

const dbConnect = async () => {
  // Prevent multiple connections
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "QuizDATA",
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
export default dbConnect;
