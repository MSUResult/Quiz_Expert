"use client";
import React from "react";
import { motion } from "framer-motion";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { IoBookSharp } from "react-icons/io5";
import { GiTargetPrize, GiBrain } from "react-icons/gi";
import { IoIosTime } from "react-icons/io";
import Link from "next/link"; // Added for routing

const LearningPath = () => {
  const cards = [
    {
      title: "Mathematics",
      slug: "vedic-math", // Added slug for routing
      desc: "Ancient Indian calculation techniques for fast mental math.",
      IconComponent: AiOutlineThunderbolt,
      chapters: 12,
      questions: 240,
      duration: "15–20 min",
      topics: [
        "Multiplication Techniques",
        "Division Methods",
        "Square & Cube Calculations",
        "Mental Math Tricks",
      ],
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      glow: "shadow-indigo-500/50",
    },
    {
      title: "General studies",
      slug: "arithmetic", // Added slug for routing
      desc: "Sharpen your basic G.S skills with logic and fun.",
      IconComponent: GiBrain,
      chapters: 10,
      questions: 180,
      duration: "10–15 min",
      topics: [
        "Addition & Subtraction",
        "Percentage Tricks",
        "Averages & Ratios",
        "Quick Estimation",
      ],
      gradient: "from-pink-500 via-red-400 to-orange-400",
      glow: "shadow-pink-500/50",
    },
  ];

  const container = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, staggerChildren: 0.2 },
    },
  };

  const cardAnim = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8"
    >
      <motion.h1
        variants={container}
        className="text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent"
      >
        Choose Your Learning Path
      </motion.h1>

      <motion.p
        variants={container}
        className="text-gray-400 text-center max-w-2xl mt-4 text-base md:text-lg mb-12"
      >
        Embark on a mathematical journey with our comprehensive quiz categories.
        Each path is designed to build your skills progressively.
      </motion.p>

      <motion.section
        variants={container}
        className="mt-8 flex flex-col lg:flex-row items-stretch justify-center gap-10 lg:gap-14"
      >
        {cards.map((card, i) => (
          <Link href={`/${card.slug}`} key={i}>
            <motion.div
              variants={cardAnim}
              whileHover={{
                y: -10,
                boxShadow: `0 0 40px 10px rgba(168, 85, 247, 0.3)`,
                transition: { duration: 0.3 },
              }}
              className={`relative w-full max-w-[480px] bg-gradient-to-br ${card.gradient} p-[2px] rounded-3xl shadow-xl ${card.glow} cursor-pointer`}
            >
              <div className="bg-[#0a0a0a] rounded-3xl p-7 flex flex-col justify-between h-full">
                {/* Card content container */}
                <div>
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="p-4 rounded-2xl bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 shadow-lg shrink-0"
                    >
                      <card.IconComponent className="text-3xl text-white" />
                    </motion.div>
                    <div>
                      <h2 className="font-bold text-2xl">{card.title}</h2>
                      <p className="text-gray-400 text-sm mt-1">{card.desc}</p>
                    </div>
                  </div>

                  {/* Info Blocks */}
                  <div className="flex justify-between text-center mt-8 gap-4">
                    <div className="flex-1 bg-gray-900/50 p-4 rounded-xl backdrop-blur-md flex flex-col items-center justify-center">
                      <IoBookSharp className="text-2xl mb-1 text-gray-300" />
                      <p className="text-xl font-semibold">{card.chapters}</p>
                      <p className="text-gray-400 text-xs uppercase tracking-wider">
                        Chapters
                      </p>
                    </div>

                    <div className="flex-1 bg-gray-900/50 p-4 rounded-xl backdrop-blur-md flex flex-col items-center justify-center">
                      <GiTargetPrize className="text-2xl mb-1 text-gray-300" />
                      <p className="text-xl font-semibold">{card.questions}</p>
                      <p className="text-gray-400 text-xs uppercase tracking-wider">
                        Questions
                      </p>
                    </div>

                    <div className="flex-1 bg-gray-900/50 p-4 rounded-xl backdrop-blur-md flex flex-col items-center justify-center">
                      <IoIosTime className="text-2xl mb-1 text-gray-300" />
                      <p className="text-xl font-semibold">{card.duration}</p>
                      <p className="text-gray-400 text-xs uppercase tracking-wider">
                        Per Quiz
                      </p>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mt-8">
                    <h3 className="font-semibold text-xl mb-3">
                      What you will learn
                    </h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                      {card.topics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Button - retains your hover animation */}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    background:
                      "linear-gradient(90deg, #9333EA 0%, #3B82F6 50%, #EC4899 100%)",
                    boxShadow:
                      "0 0 25px rgba(147,51,234,0.6), 0 0 50px rgba(59,130,246,0.4)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full mt-8 font-bold text-lg py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all shadow-lg"
                >
                  Start Learning <span className="ml-2">→</span>
                </motion.button>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.section>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-20 w-full max-w-4xl mx-auto text-center bg-gradient-to-br from-purple-600/20 via-blue-700/10 to-pink-600/20 rounded-3xl border border-purple-500/30 shadow-2xl shadow-purple-700/40 p-10 backdrop-blur-xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-4"
        >
          Ready to Challenge Yourself?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg mb-8"
        >
          Join thousands of students who have improved their mathematical skills
          with our platform. Take the next step and test your knowledge today!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 0 30px rgba(147,51,234,0.5), 0 0 60px rgba(59,130,246,0.4)",
            }}
            className="px-8 py-3 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg transition-all duration-300"
          >
            Start Math Quiz
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 0 30px rgba(59,130,246,0.5), 0 0 60px rgba(34,197,94,0.4)",
            }}
            className="px-8 py-3 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 shadow-lg transition-all duration-300"
          >
            Try GS Quiz
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LearningPath;
