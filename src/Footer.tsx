import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-400 text-white pb-8 overflow-hidden">
      {/* Decorative SVG Wave - subtle and behind content */}
      <div className="absolute top-0 left-0 w-full z-0" style={{lineHeight: 0}}>
        <svg viewBox="0 0 1440 60" width="100%" height="60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="footerWave" x1="0" x2="0" y1="0" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.7" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,40 C480,80 960,0 1440,40 L1440,60 L0,60 Z" fill="url(#footerWave)" />
        </svg>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-6 pt-16"
      >
        {/* Brand/Logo */}
        <div className="text-2xl font-bold tracking-tight">AI Student Productivity</div>
        {/* Navigation */}
        <nav className="flex gap-6 text-base">
          <a href="#features" className="hover:text-blue-400 transition">Features</a>
          <a href="#howitworks" className="hover:text-blue-400 transition">How It Works</a>
          <a href="#faq" className="hover:text-blue-400 transition">FAQ</a>
          <a href="#benefits" className="hover:text-blue-400 transition">Benefits</a>
        </nav>
        {/* Social Icons */}
        <div className="flex gap-5">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaTwitter size={22} />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaLinkedin size={22} />
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaGithub size={22} />
          </a>
        </div>
      </motion.div>
      {/* Copyright */}
      <div className="text-center text-gray-200 text-sm mt-8 z-10 relative">
        &copy; {new Date().getFullYear()} AI Student Productivity. All rights reserved.
      </div>
      <div className="text-center text-gray-100 text-xs mt-2 z-10 relative">
        Powered by <a href="https://github.com/maazshah123" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-100 hover:text-blue-200 underline transition">Muhammad-Maaz</a>
      </div>
    </footer>
  );
} 