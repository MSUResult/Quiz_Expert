"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) return;
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("❌ Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const navLinks = [
    { text: "Home", href: "/" },
    // { text: "Math", href: "/vedic-math" },

    { text: "Leaderboard", href: "/leaderboard" },
    { text: "About", href: "/About" },
  ];

  const menuVariants = {
    initial: { opacity: 0, y: -50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full fixed top-0 left-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" passHref>
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/logo.jpg"
              alt="Expert Academy"
              width={45}
              height={45}
              className="rounded-full border-2 border-cyan-400/50"
            />
            <h1 className="text-white text-2xl font-bold tracking-wide hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              Quiz
            </h1>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-2 items-center text-gray-200 font-medium">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <motion.li
                key={item.href}
                className="relative px-4 py-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className={`transition-colors duration-300 ${
                    isActive ? "text-cyan-400" : "hover:text-cyan-300"
                  }`}
                >
                  {item.text}
                </Link>
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
                    layoutId="underline"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.li>
            );
          })}

          {/* User Profile Desktop */}
          {user && (
            <Link href={"/profile"}>
              <motion.li
                className="flex items-center gap-2 ml-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span className="text-cyan-300 font-semibold text-lg">
                  {user.firstName}
                </span>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500 shadow-md">
                  <Image
                    src={user.profileImage || "/default-avatar.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover object-top w-full h-full"
                  />
                </div>
              </motion.li>
            </Link>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-white text-3xl z-50">
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className="md:hidden absolute top-0 left-0 w-full h-screen bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 text-2xl"
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`font-semibold transition-colors duration-300 ${
                      isActive
                        ? "text-cyan-400"
                        : "text-white hover:text-cyan-300"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.text}
                  </Link>
                </li>
              );
            })}

            {/* User Info in Mobile Menu - now clickable */}
            {user && (
              <Link href="/profile" onClick={() => setMenuOpen(false)}>
                <motion.li
                  className="flex flex-col items-center gap-3 pt-6 border-t border-gray-700 w-4/5 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg">
                    <Image
                      src={user.profileImage || "/default-avatar.png"}
                      alt="Profile"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-cyan-300 font-semibold text-xl">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-gray-400 text-sm">View Profile</span>
                </motion.li>
              </Link>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
