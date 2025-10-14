"use client";

import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  Fa,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] text-white border-t border-gray-700 py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Quiz</h2>
          <p className="text-gray-300 leading-relaxed">
            Master mathematics through interactive quizzes and challenges.
            Enhance your Math and G.K skills with our comprehensive learning
            platform.
          </p>
        </div>

        {/* Contact Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Contact</h2>
          <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer">
            <motion.span
              whileHover={{ scale: 1.3, color: "#34D399" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FiMail />
            </motion.span>
            expertacademy@gmail.com
          </div>
          <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer">
            <motion.span
              whileHover={{ scale: 1.3, color: "#34D399" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FiPhone />
            </motion.span>
            +91 7618550475
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <motion.span
              whileHover={{ scale: 1.3, color: "#34D399" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FiMapPin />
            </motion.span>
            Gill Colony
          </div>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <motion.a
              href="https://facebook.com/"
              target="_blank"
              whileHover={{ scale: 1.3, color: "#34D399" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaFacebook size={24} />
            </motion.a>
            <motion.a
              href="https://youtube.com/"
              target="_blank"
              whileHover={{ scale: 1.3, color: "#34D399" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaYoutube size={24} />
            </motion.a>
            <motion.a
              href="https://instagram.com/"
              target="_blank"
              whileHover={{ scale: 1.3, color: "#34D399" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaInstagram size={24} />
            </motion.a>
          </div>
        </div>

        {/* Developer Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Developer Info</h2>
          <p className="text-xl font-semibold">Shivansh</p>
          <div className="flex flex-col gap-2 text-gray-300">
            <motion.a
              href="mailto:shivanshsingh4539@gmail.com"
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.2, color: "#34D399" }}
            >
              <FiMail /> shivanshsingh4539@gmail.com
            </motion.a>
            <motion.a
              href="tel:+917618550475"
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.2, color: "#34D399" }}
            >
              <FiPhone /> +91 7618550475
            </motion.a>
            <div className="flex items-center gap-2">
              <FiMapPin /> Saharanpur
            </div>
          </div>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <motion.a
              href="https://github.com/MSUResult"
              target="_blank"
              whileHover={{ scale: 1.3, color: "#34D399" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaGithub size={24} />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/adarshsingh2987/"
              target="_blank"
              whileHover={{ scale: 1.3, color: "#34D399" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaInstagram size={24} />
            </motion.a>
            <motion.a
              href="https://twitter.com/"
              target="_blank"
              whileHover={{ scale: 1.3, color: "#34D399" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaTwitter size={24} />
            </motion.a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Quiz Website. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
