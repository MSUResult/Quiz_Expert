import { Lightbulb } from "lucide-react";

// This is the static component for "Learning Tips".
// Just like the Hero Section, the content is hardcoded.
const LearningTips = () => {
  const tips = [
    {
      title: "Practice Daily",
      description:
        "Consistency is key. Spend at least 15 minutes a day practicing different techniques to build muscle memory.",
    },
    {
      title: "Understand the 'Why'",
      description:
        "Don't just memorize the formulas (sutras). Try to understand the logic behind them to solve complex problems.",
    },
    {
      title: "Start with the Basics",
      description:
        "Master the fundamental concepts like addition and subtraction before moving on to advanced multiplication.",
    },
  ];

  return (
    <div className="bg-[#111827] pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">Learning Tips</h2>
          <p className="text-lg text-gray-400 mt-2">
            A few tips to help you on your journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-[#1F2937] p-8 rounded-2xl border border-gray-700"
            >
              <div className="flex items-center gap-4 mb-4">
                <Lightbulb className="text-yellow-400" size={24} />
                <h3 className="text-xl font-bold text-white">{tip.title}</h3>
              </div>
              <p className="text-gray-400">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningTips;
