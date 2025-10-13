import { ArrowLeft, BrainCircuit, BookOpen, Users, Clock } from "lucide-react";

// This is the code for your static Hero Section.
// All the content is hardcoded directly into the component.
const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-[#4F46E5] to-[#7C3AED] text-white py-16 px-4 sm:px-6 lg:px-8 rounded-b-3xl">
      <div className="max-w-7xl mx-auto">
        {/* Back to Home Link */}
        <div className="mb-12">
          <a
            href="#"
            className="flex items-center gap-2 text-indigo-200 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </a>
        </div>

        {/* Main Content */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <BrainCircuit size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Mathematics
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-indigo-200 mb-10">
            Discover the ancient Indian system of mathematics that makes
            calculations faster and more intuitive.
          </p>

          {/* Info Cards */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <InfoCard
              icon={<BookOpen size={24} />}
              title="6 Chapters"
              subtitle="Progressive Learning"
            />
            <InfoCard
              icon={<Users size={24} />}
              title="5K+ Students"
              subtitle="Active Learners"
            />
            <InfoCard
              icon={<Clock size={24} />}
              title="2-4 Hours"
              subtitle="Total Duration"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// A small helper component for the info cards to avoid repetition.
const InfoCard = ({ icon, title, subtitle }) => (
  <div className="bg-white/10 p-6 rounded-2xl flex items-center gap-4 w-full sm:w-auto sm:min-w-[220px] backdrop-blur-sm">
    <div className="text-indigo-300">{icon}</div>
    <div>
      <p className="font-bold text-lg">{title}</p>
      <p className="text-sm text-indigo-200">{subtitle}</p>
    </div>
  </div>
);

export default HeroSection;
