import QuizInterface from "@/components/vedic-math/QuizInterface";
import { notFound } from "next/navigation";

async function getChapterById(id) {
  const apiUrl = `${
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"
  }/api/getting/chapters/onebyone/${id}`;
  try {
    const res = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
      return null; // Handle not found or other errors
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function QuizPage({ params }) {
  const { chapterId } = params;
  const chapterData = await getChapterById(chapterId);

  // If chapter data couldn't be fetched, show a 404 page
  if (!chapterData) {
    notFound();
  }

  return (
    <main className="bg-[#111827] min-h-screen flex items-center justify-center p-4">
      {/* We pass the fetched data to our interactive client component */}
      <QuizInterface chapter={chapterData} />
    </main>
  );
}
