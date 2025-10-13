"use client";
import React from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { motion } from "framer-motion";
import { AiOutlineBook } from "react-icons/ai"; // Math Quiz icon
import { GiEarthAmerica } from "react-icons/gi"; // GS Quiz icon

const HomePage = () => {
  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, duration: 0.6 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.main
      className="pt-[120px] min-h-screen w-full flex flex-col items-center justify-start gap-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Header Badge */}
      <motion.h1
        className="border border-purple-400 text-purple-600 flex gap-3 rounded-xl p-3 items-center justify-center backdrop-blur-md bg-white/10 shadow-lg"
        variants={item}
      >
        <AiOutlineThunderbolt className="text-2xl animate-pulse text-yellow-300" />
        Interactive Learning Platform
      </motion.h1>

      {/* Main Title */}
      <motion.h1
        className="text-6xl md:text-7xl font-extrabold text-center leading-[1.2] text-white drop-shadow-lg"
        variants={item}
      >
        Master Math with <br />
        <span className="block mx-auto bg-gradient-to-r from-purple-800 via-white to-green-500 bg-clip-text text-transparent">
          QuizMaster
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        className="w-full md:w-3/5 text-xl md:text-3xl text-center text-gray-100"
        variants={item}
      >
        Enhance your mathematical skills through interactive Vedic Math and
        Abacus quizzes. Learn ancient calculation techniques with modern
        technology.
      </motion.p>

      {/* Buttons */}
      <motion.div className="flex flex-col md:flex-row gap-5" variants={item}>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 px-6 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 
               text-white rounded-2xl font-bold shadow-lg shadow-purple-400/50 
               hover:shadow-purple-500/70 transition-all duration-300 flex items-center justify-center gap-3"
        >
          <AiOutlineThunderbolt className="text-2xl animate-pulse" />
          Start Math Quiz
        </motion.button>

        {/* Try GS Quiz Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 px-6 bg-gradient-to-r from-green-600 via-blue-500 to-indigo-600 
               text-white rounded-2xl font-bold shadow-lg shadow-blue-400/50 
               hover:shadow-blue-500/70 transition-all duration-300 flex items-center justify-center gap-3"
        >
          <GiEarthAmerica className="text-2xl animate-bounce" />
          Try GS Quiz
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="flex flex-col md:flex-row gap-10 mt-6 justify-center"
        variants={item}
      >
        <div className="text-center font-bold text-white">
          <span className="text-3xl md:text-4xl text-yellow-400">500+</span>
          <p className="mt-1 text-gray-200">Practice Questions</p>
        </div>
        <div className="text-center font-bold text-white">
          <span className="text-3xl md:text-4xl text-yellow-400">100+</span>
          <p className="mt-1 text-gray-200">Interactive Quizzes</p>
        </div>
        <div className="text-center font-bold text-white">
          <span className="text-3xl md:text-4xl text-yellow-400">50+</span>
          <p className="mt-1 text-gray-200">Vedic Math Lessons</p>
        </div>
      </motion.div>
    </motion.main>
  );
};

export default HomePage;
