import React from "react";
import Image from "next/image";

export default function Content() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Grid: image | main article | sidebar (responsive) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: image */}
        <div className="flex flex-col md:col-span-5">
          <figure className=" w-full overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/img.jpg"
              alt="Descriptive alt text for the image"
              width={1200}
              height={800}
              className="w-full h-64 md:h-full object-cover"
              loading="lazy"
              priority={false}
            />
            <figcaption className="sr-only">
              Image caption (optional)
            </figcaption>
          </figure>

          <p>Kansas City Has a Massive Array of Big National Companies</p>

          <div className="flex gap-7 w-full">
            <p>strategy</p>
            <p>Athor singh</p>
          </div>
        </div>

        {/* Middle: article */}
        <article className="md:col-span-5 bg-white p-6 rounded-2xl shadow-sm">
          <header>
            {/* Only one H1 for the page/article */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-red-600 mb-3">
              Topic title goes here
            </h1>
            <p className="text-sm text-gray-500 mb-4">Updated: Nov 2, 2025</p>
          </header>

          <p className="text-gray-700 leading-relaxed line-clamp-4 md:line-clamp-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
            beatae. A short excerpt or summary of the article — keep it
            scannable for users.
          </p>

          <hr className="my-6 border-t-2 border-gray-100" />

          <div className="flex gap-3 items-center">
            <a
              href="#"
              className="inline-block px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-shadow focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Read more
            </a>
            <button className="px-3 py-2 rounded-lg border border-gray-200 text-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-200">
              Save
            </button>
          </div>
        </article>

        {/* Right: small sidebar */}
        <aside className="md:col-span-2 bg-gray-50 p-4 rounded-2xl h-fit">
          <h2 className="text-lg font-semibold text-purple-600 mb-3">
            Hot this week
          </h2>

          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-red-500">Strategy</h3>
              <p className="text-sm text-gray-700">
                Kansas City Has a Massive Array of Big National Companies
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-bold text-red-500">Design</h3>
              <p className="text-sm text-gray-700">
                Why layout choices matter for readability
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
