import HeroSection from "@/components/arithmetic/HeroSection";
import LearningChapters from "@/components/arithmetic/LearningChapters";
import LearningTips from "@/components/arithmetic/LearningTips";

// This is your main page component for the /vedic-math route.
// It acts as a container that arranges the other components.
export default function Arithmetics() {
  return (
    <main className="bg-[#111827] min-h-screen">
      {/* 1. The HeroSection is the first static component */}
      <HeroSection />

      {/* 2. The LearningChapters is your dynamic component */}
      <LearningChapters />

      {/* 3. The LearningTips is another static component */}
      <LearningTips />
    </main>
  );
}
