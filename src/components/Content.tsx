"use client";
import React, { useEffect, useState } from "react";

export default function Content() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/GetNews");
        const data = await res.json();

        if (data && Array.isArray(data.results)) {
          setNews(data.results);
        } else {
          console.warn("⚠️ Unexpected API response:", data);
          setNews([]);
        }
      } catch (error) {
        console.error("❌ Error fetching news:", error);
        setNews([]);
      }
    };

    fetchNews();
  }, []);

  const topImage = news[0]?.image_url || "/img.jpg";

  return (
    <main className="container mx-auto px-4 py-8">
      {/* ✅ Top banner image (only once) */}
      <div className="w-full mb-10 overflow-hidden rounded-2xl shadow-md">
        <img
          src={topImage}
          alt="Top current affairs image"
          className="w-full h-64 md:h-96 object-cover"
          loading="lazy"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* 📰 Middle: News List */}
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

                <p className="text-gray-700 leading-relaxed line-clamp-4 md:line-clamp-6 mb-3">
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

        {/* 🔥 Right: Hot This Week */}
        <aside className="md:col-span-4 bg-gray-50 p-4 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold text-purple-600 mb-4">
            🔥 Hot This Week
          </h2>

          <div className="flex flex-col gap-5">
            {news.slice(0, 5).map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 items-center bg-white hover:bg-purple-50 transition-all p-3 rounded-xl shadow-sm"
              >
                {/* ✅ Small thumbnail */}
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

                {/* ✅ Title & meta */}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-purple-700">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.category?.[0] || "General"}
                  </p>
                </div>
              </a>
            ))}

            {/* 
            <div className="questions">










            </div> */}
          </div>
        </aside>
      </div>
    </main>
  );
}
