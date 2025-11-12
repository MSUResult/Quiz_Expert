// /app/api/gemini/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// 🧠 In-memory cache
let cachedQuiz: any = null;
let lastGenerated = 0;
const CACHE_DURATION = 8 * 60 * 60 * 1000; // 8 hours

export async function POST(req: Request) {
  const now = Date.now();

  // ⚡ Return cached quiz if still valid
  if (cachedQuiz && now - lastGenerated < CACHE_DURATION) {
    console.log("🧠 Using cached quiz");
    return NextResponse.json({ success: true, quiz: cachedQuiz });
  }

  const { newsItems } = await req.json();

  if (!Array.isArray(newsItems) || newsItems.length === 0) {
    return NextResponse.json({ error: "No news items" }, { status: 400 });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // 📰 Format news text for Gemini
    const newsText = newsItems
      .map(
        (n, i) =>
          `News ${i + 1}:\nTitle: ${n.title}\nDescription: ${
            n.description || "N/A"
          }\n`
      )
      .join("\n");

    // 🧩 Strict prompt for consistent JSON
    const prompt = `
You are an expert in creating SSC/UPSC-style MCQs.
Based on the 5 news articles below, create exactly 1 question per news (total 5).
Each question must have exactly 4 options (A–D).
Return only valid JSON — no markdown, no explanations.

News Articles:
${newsText}

Output format example:
[
  {
    "question": "Who is the current Prime Minister of India?",
    "options": ["A) Narendra Modi", "B) Rahul Gandhi", "C) Amit Shah", "D) Manmohan Singh"]
  }
]
`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    // 🧠 Try to extract valid JSON array
    const jsonMatch = text.match(/\[.*\]/s);
    const quiz = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

    // 🧹 Clean and normalize data
    const cleanQuiz = quiz.map((q: any) => {
      let optionsArray: string[] = [];

      if (Array.isArray(q.options)) {
        optionsArray = q.options;
      } else if (typeof q.options === "object" && q.options !== null) {
        // Convert object like {A:"...",B:"..."} → ["A) ...", "B) ..."]
        optionsArray = Object.entries(q.options).map(
          ([key, value]) => `${key}) ${value}`
        );
      } else if (typeof q.options === "string") {
        // Split string into an array by commas, semicolons, or newlines
        optionsArray = q.options
          .split(/[,;|\n]\s*/)
          .filter(Boolean)
          .slice(0, 4);
      } else {
        optionsArray = ["Option A", "Option B", "Option C", "Option D"];
      }

      return {
        question: q.question || "No question provided",
        options: optionsArray,
      };
    });

    // 🧠 Save to cache
    cachedQuiz = cleanQuiz;
    lastGenerated = now;

    console.log("✅ Quiz cached and normalized");
    return NextResponse.json({ success: true, quiz: cleanQuiz });
  } catch (error: any) {
    console.error("❌ Gemini API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
