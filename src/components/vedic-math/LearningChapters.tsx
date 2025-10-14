import Link from "next/link";
import {
  FaBook,
  FaClock,
  FaPlay,
  FaLock,
  FaCheckCircle,
  FaRedo,
} from "react-icons/fa";

// --- Fetch chapters with ABSOLUTE URL ---
async function getVedicMathChapters() {
  // ✅ FIX: Construct the full URL using the environment variable.
  const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const apiUrl = `${domain}/api/getting/chapters/Math`;

  // console.log(`[FRONTEND] Fetching chapters from URL: ${apiUrl}`);

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });
    // console.log(`[FRONTEND] Received response with status: ${res.status}`);

    if (!res.ok) {
      console.error("[FRONTEND] Failed to fetch chapters. Status:", res.status);
      // Log the response body to see the error from the API
      const errorBody = await res.text();
      console.error("[FRONTEND] Error response body:", errorBody);
      return [];
    }

    const data = await res.json();
    // console.log("[FRONTEND] Successfully parsed JSON data:", data);
    return data.data || [];
  } catch (error) {
    // This will now catch the Invalid URL error if it happens again.
    // console.error("[FRONTEND] A critical error occurred during fetch:", error);
    return [];
  }
}

// --- Difficulty tag helper ---
const getDifficultyTag = (chapterNumber: number) => {
  if (chapterNumber <= 2) return { text: "Beginner", color: "bg-green-600" };
  if (chapterNumber <= 5)
    return { text: "Intermediate", color: "bg-orange-500" };
  return { text: "Advanced", color: "bg-red-600" };
};

// --- Action Button Component ---
const ActionButton = ({
  isLocked,
  isCompleted,
  chapterId,
}: {
  isLocked: boolean;
  isCompleted: boolean;
  chapterId: string;
}) => {
  if (isLocked) {
    return (
      <button
        disabled
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-700/50 text-gray-400 font-semibold cursor-not-allowed"
      >
        <FaLock /> Locked
      </button>
    );
  }
  if (isCompleted) {
    return (
      <Link href={`/vedic-math/quiz/${chapterId}`} className="w-full">
        <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-300 transform hover:scale-105">
          <FaRedo /> Retake Quiz
        </button>
      </Link>
    );
  }
  return (
    <Link href={`/vedic-math/quiz/${chapterId}`} className="w-full">
      <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-600/20">
        <FaPlay /> Start Quiz
      </button>
    </Link>
  );
};

// --- MAIN COMPONENT ---
export default async function LearningChapters() {
  // console.log(
  //   "[FRONTEND] LearningChapters component is rendering on the server."
  // );
  const chapters = await getVedicMathChapters();

  if (!chapters || chapters.length === 0) {
    // console.log("[FRONTEND] No chapters found, rendering fallback UI.");
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white">No Chapters Found</h2>
        <p className="text-gray-400 mt-2">
          Could not load the learning materials. Please check the server console
          for errors.
        </p>
      </div>
    );
  }

  // console.log(
  //   `[FRONTEND] Rendering timeline with ${chapters.length} chapters.`
  // );
  return (
    <div className="bg-[#0D1117] min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl lg:mx-0 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Learning Chapters
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Progress through each chapter to master Mathematics. Complete
            chapters in order to unlock the next level.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gray-700" />
          <div className="space-y-12 md:space-y-0">
            {chapters.map((chapter: any, index: number) => {
              const isLocked = index > 1; // Example logic
              const isCompleted = index < 1; // Example logic
              const tag = getDifficultyTag(chapter.chapterNumber);

              let statusIcon, statusColor;
              if (isCompleted) {
                statusIcon = <FaCheckCircle />;
                statusColor = "bg-green-500";
              } else if (isLocked) {
                statusIcon = <FaLock />;
                statusColor = "bg-gray-600";
              } else {
                statusIcon = <FaPlay />;
                statusColor = "bg-purple-500 animate-pulse";
              }

              const isRightSide = index % 2 !== 0;

              return (
                <div
                  key={chapter._id}
                  className="relative md:grid md:grid-cols-2 md:gap-x-16"
                >
                  <div
                    className={`absolute left-1/2 top-4 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0D1117] ${statusColor}`}
                  >
                    <span className="text-white text-lg">{statusIcon}</span>
                  </div>
                  <div
                    className={`hidden md:block ${
                      isRightSide ? "" : "col-start-2"
                    }`}
                  ></div>
                  <div
                    className={`mb-12 md:mb-24 ${
                      isRightSide ? "col-start-2" : ""
                    }`}
                  >
                    <div
                      className={`p-6 rounded-2xl border transition-all duration-300 ${
                        isLocked
                          ? "bg-gray-900/40 border-gray-800 opacity-60 cursor-not-allowed"
                          : "bg-gradient-to-br from-gray-900 to-gray-800/60 border-gray-700 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-600/10 transform hover:-translate-y-1"
                      }`}
                    >
                      {/* ... (rest of your card JSX is fine) ... */}
                      <div className="flex flex-col gap-4">
                        <div>
                          <div className="flex items-center gap-4 mb-3">
                            <span
                              className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${tag.color}`}
                            >
                              {tag.text}
                            </span>
                            <h3 className="text-xl font-bold text-white">
                              Chapter {chapter.chapterNumber}: {chapter.title}
                            </h3>
                          </div>
                          <p className="text-gray-400 text-sm mb-4">
                            {chapter.description}
                          </p>
                          <div className="flex items-center gap-6 text-sm text-gray-300">
                            <div className="flex items-center gap-2">
                              <FaBook className="text-purple-400" />
                              <span>{chapter.questions.length} Questions</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaClock className="text-purple-400" />
                              <span>{chapter.timeEstimate} min</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-3">
                          {isCompleted && !isLocked && (
                            <div className="w-full">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-300">
                                  Best Score
                                </span>
                                <span className="text-sm font-medium text-green-400">
                                  85%
                                </span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2.5">
                                <div
                                  className="bg-green-500 h-2.5 rounded-full"
                                  style={{ width: "85%" }}
                                ></div>
                              </div>
                            </div>
                          )}
                          <div className="w-full mt-2">
                            <ActionButton
                              isLocked={isLocked}
                              isCompleted={isCompleted}
                              chapterId={chapter._id}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
