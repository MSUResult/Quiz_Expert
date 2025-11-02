import Content from "@/components/Content";

export const generateMetadata = async () => {
  return {
    title:
      "Daily Current Affairs 2025 in Hindi & English for SSC, UPSC, UP Police, Banking",
    description:
      "Get Daily Current Affairs 2025 in Hindi & English for SSC, UPSC, UP Police, Banking, and other Sarkari exams. Practice quizzes & PDFs for free!",
    keywords: [
      "current affairs 2025",
      "today current affairs",
      "ssc current affairs",
      "up police current affairs",
      "banking current affairs",
      "current affairs quiz",
      "sarkari exam news",
      "daily gk update",
      "current affairs pdf",
      "current affairs in hindi",
    ],
  };
};

const Currentaffair = () => {
  return (
    <main className="min-h-[80vh] pt-24 flex flex-col items-center justify-center border-b border-gray-300 text-center px-5  bg-gradient-to-br from-indigo-50 via-white to-green-50">
      <div>
        <h1 className="text-3xl md:text-5xl font-bold mb-5">
          Current Affairs For Candidates
        </h1>
        <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto">
          Focused content only — no{" "}
          <span className="bg-gradient-to-r from-purple-500 to-green-400 text-transparent bg-clip-text font-semibold">
            vulgarity
          </span>
          , no <span className="font-semibold">crime</span>, no{" "}
          <span className="font-semibold">distractions</span>. Learn what truly
          matters for your exams and future.
        </p>
      </div>

      <div className="mt-6 w-full">
        <Content />
      </div>
    </main>
  );
};

export default Currentaffair;
