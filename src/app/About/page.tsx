"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, ShieldCheck, BookOpen, Users } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen flex items-center justify-center flex-col mt-[12vh] mb-10 px-6">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-600">
          About <span className="text-slate-900">Expert Academy</span>
        </h1>
        <p className="mt-3 text-sm md:text-base text-slate-600">
          Trusted coaching for UPSI, UP Police, SSC and UPTET — smart
          strategies, rigorous practice and personalized mentorship to turn your
          goals into government careers.
        </p>
      </motion.header>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"
      >
        {/* Left: Images */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">
          <motion.div
            initial={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative h-96 lg:h-[42rem] w-full"
          >
            <Image
              src="/img.jpg"
              alt="Expert Academy classroom"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute bottom-6 left-6 bg-blue-600/90 text-white px-4 py-2 rounded-md backdrop-blur">
              <p className="text-sm font-medium">Proven classroom training</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-2 p-3 bg-white">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="relative h-40 rounded-md overflow-hidden"
            >
              <Image
                src="/ig.jpg"
                alt="Students studying"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </motion.div>

            <motion.div
              initial={{ x: 10, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18 }}
              className="flex flex-col justify-center p-3"
            >
              <h3 className="text-lg font-semibold">Why students choose us</h3>
              <ul className="mt-2 text-sm text-slate-600 space-y-1">
                <li>Experienced faculty with exam-day strategies</li>
                <li>Small batches & personal mentoring</li>
                <li>Extensive test series and performance analytics</li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col gap-6">
          <motion.article
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-2xl shadow-md"
          >
            <p className="text-slate-700 leading-relaxed">
              Welcome to <strong>Expert Academy</strong> — your partner in
              transforming ambition into achievement. We provide focused,
              research-backed coaching for UPSI, UP Police, SSC and UPTET.
              Success in competitive exams is built on clarity of concepts,
              strategic practice, and consistent guidance — and that's exactly
              what we deliver. Our courses combine live classroom instruction,
              comprehensive study material, technology-driven test series and
              one-to-one mentorship to make sure every student progresses with
              confidence.
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  title: "UPSI",
                  desc: "Focused strategy & physical test prep",
                  icon: <ShieldCheck size={18} />,
                },
                {
                  title: "UP Police",
                  desc: "Syllabus mastery & mock interviews",
                  icon: <Users size={18} />,
                },
                {
                  title: "SSC",
                  desc: "Speed & accuracy training",
                  icon: <BookOpen size={18} />,
                },
                {
                  title: "UPTET",
                  desc: "Pedagogy-based conceptual lessons",
                  icon: <Award size={18} />,
                },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg"
                >
                  <div className="p-2 rounded-md bg-white shadow-sm">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{f.title}</h4>
                    <p className="text-sm text-slate-600">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:brightness-95"
              >
                Join a Free Demo
              </a>

              <a href="/courses" className="text-sm text-slate-500 underline">
                View Courses
              </a>
            </div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex gap-4"
          >
            <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm text-center">
              <div className="text-2xl font-bold text-blue-600">+85%</div>
              <div className="text-sm text-slate-600">Average pass rate</div>
            </div>

            <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm text-center">
              <div className="text-2xl font-bold text-slate-900">500+</div>
              <div className="text-sm text-slate-600">Students coached</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <footer className="mt-8 text-sm text-slate-500">
        © {new Date().getFullYear()} Expert Academy
      </footer>
    </main>
  );
}
