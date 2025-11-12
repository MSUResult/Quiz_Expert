"use client";
import React, { useEffect, useState } from "react";

export default function Content() {
  const [news, setNews] = useState<any[]>([]);
  const [quiz, setQuiz] = useState<any[]>([]);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  // 📰 Fetch news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/GetNews");
        const data = await res.json();
        if (data && Array.isArray(data.results)) {
          setNews(data.results);
        } else {
          setNews([]);
        }
      } catch (error) {
        console.error("❌ Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  // 🤖 Once news arrives, send top 5 items to Gemini
  useEffect(() => {
    if (news.length >= 5) {
      const generateQuiz = async () => {
        setLoadingQuiz(true);
        try {
          const firstFive = news.slice(0, 5);
          const res = await fetch("/api/gemini", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newsItems: firstFive }),
          });

          const data = await res.json();
          if (data.success && Array.isArray(data.quiz)) {
            setQuiz(data.quiz);
          } else {
            setQuiz([]);
          }
        } catch (err) {
          console.error("⚠️ Quiz generation failed:", err);
        } finally {
          setLoadingQuiz(false);
        }
      };

      generateQuiz();
    }
  }, [news]);

  const topImage = news[0]?.image_url || "/img.jpg";

  return (
    <main className="container mx-auto px-4 py-8">
      {/* 🖼️ Top banner */}
      <div className="w-full mb-10 overflow-hidden rounded-2xl shadow-md">
        <img
          src={topImage}
          alt="Top current affairs"
          className="w-full h-64 md:h-96 object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* 📰 Main News */}
        <article className="md:col-span-8 bg-white p-6 rounded-2xl shadow-sm">
          {news.length === 0 ? (
            <p className="text-gray-500 text-center">
              Loading current affairs...
            </p>
          ) : (
            news.map((item, index) => (
              <div key={index} className="mb-6">
                <h1 className="text-2xl md:text-3xl font-extrabold text-red-600 mb-2">
                  {item.title}
                </h1>
                <p className="text-gray-700 leading-relaxed line-clamp-5 mb-3">
                  {item.description || "No description available."}
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Read more →
                </a>
                <hr className="my-6 border-t-2 border-gray-100" />
              </div>
            ))
          )}
        </article>

        {/* 🔥 Sidebar */}
        <aside className="md:col-span-4 bg-gray-50 p-4 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-purple-600 mb-4">
            🔥 Hot This Week
          </h2>

          <div className="flex flex-col gap-5 mb-6">
            {news.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="flex gap-3 items-center bg-white hover:bg-purple-50 transition-all p-3 rounded-xl shadow-sm"
              >
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs">
                    No Img
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-purple-700">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.category?.[0] || "General"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 🧠 Quiz Section */}
          <div className="bg-white p-4 rounded-xl shadow-inner">
            <h3 className="text-lg font-bold text-blue-600 mb-2">
              🧠 Current Affairs Quiz
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              Based on today’s top 5 news — 1 question per news.
            </p>

            {loadingQuiz ? (
              <p className="text-gray-500 italic">Generating questions...</p>
            ) : quiz.length > 0 ? (
              <ul className="space-y-4">
                {quiz.map((q, i) => (
                  <li key={i} className="border-b pb-3">
                    <p className="font-medium text-gray-800 mb-1">
                      {i + 1}. {q.question}
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-3 list-disc">
                      {Array.isArray(q.options) ? (
                        q.options.map((opt: string, j: number) => (
                          <li key={j}>{opt}</li>
                        ))
                      ) : (
                        <li>{q.options}</li>
                      )}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No quiz generated.</p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
