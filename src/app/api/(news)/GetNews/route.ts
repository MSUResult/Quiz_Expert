import { NextResponse } from "next/server";

export const revalidate = 28800; // 8 hours cache

export async function GET() {
  const API_KEY = process.env.NEWSAPI;
  const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&category=politics,education&language=en&q=ssc`;

  console.log("🔍 Fetching news from:", url);
  console.log("🧩 API Key available?", !!API_KEY);

  try {
    const res = await fetch(url, {
      next: { revalidate: 28800 }, // ISR revalidation
    });

    console.log("📡 Response status:", res.status);

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Response not OK:", text);
      return NextResponse.json(
        { error: "Failed to fetch from NewsData API", status: res.status },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log(
      "✅ Successfully fetched news:",
      data?.results?.length || 0,
      "articles"
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("🚨 Fetch failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch news", details: (error as Error).message },
      { status: 500 }
    );
  }
}
