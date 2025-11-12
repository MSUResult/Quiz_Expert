// /app/api/GetNews/route.ts
import { NextResponse } from "next/server";

let cachedNews: any = null;
let lastFetched = 0;
const CACHE_DURATION = 8 * 60 * 60 * 1000; // 8 hours in ms

export async function GET() {
  const now = Date.now();

  if (cachedNews && now - lastFetched < CACHE_DURATION) {
    console.log("🧠 Using cached news");
    return NextResponse.json(cachedNews);
  }

  console.log("🌐 Fetching fresh news...");
  const API_KEY = process.env.NEWSAPI;
  const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&category=politics,education&language=en&q=ssc`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    cachedNews = data;
    lastFetched = now;

    console.log("✅ News updated in cache");
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("❌ Error fetching news:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
