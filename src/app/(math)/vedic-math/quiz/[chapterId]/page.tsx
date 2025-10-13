import QuizInterface from "@/components/vedic-math/QuizInterface";
import { notFound } from "next/navigation";

// ✅ Use environment-based base URL
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

async function getChapterById(id: string) {
  const apiUrl = `${BASE_URL}/api/getting/chapters/onebyone/${id}`;

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });
    if (!res.ok) return null;

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

// ✅ Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function QuizPage({
  params,
}: {
  params: { chapterId: string };
}) {
  const { chapterId } = params;
  const chapterData = await getChapterById(chapterId);

  if (!chapterData) notFound();

  return (
    <main className="bg-[#111827] min-h-screen flex items-center justify-center p-4">
      <QuizInterface chapter={chapterData} />
    </main>
  );
}
