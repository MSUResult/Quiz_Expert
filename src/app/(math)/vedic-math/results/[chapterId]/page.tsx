import { notFound } from "next/navigation";
import ResultsDisplay from "@/components/vedic-math/ResultsDisplay";

// This function fetches the chapter data, including correct answers and explanations.
async function getChapterById(id) {
  // IMPORTANT: Make sure this URL is correct based on your API route structure
  const apiUrl = `${
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"
  }/api/getting/chapters/onebyone/${id}`;
  try {
    const res = await fetch(apiUrl, { cache: "no-store" });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ResultsPage({ params }) {
  const { chapterId } = params;
  const chapterData = await getChapterById(chapterId);

  if (!chapterData) {
    notFound();
  }

  return (
    <main className="bg-[#111827] min-h-screen py-12 px-4">
      <ResultsDisplay chapter={chapterData} />
    </main>
  );
}
