import { useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#howitworks" },
  { label: "FAQ", href: "#faq" },
  { label: "Benefits", href: "#benefits" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md shadow-md"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo/Brand */}
        <a href="#" className="text-xl font-bold text-blue-700 tracking-tight">AI Student Productivity</a>
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-800 hover:text-blue-600 font-medium transition"
            >
              {link.label}
            </a>
          ))}
        </div>
        {/* Hamburger for Mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span className="w-7 h-1 bg-blue-700 rounded transition" />
          <span className="w-7 h-1 bg-blue-700 rounded transition" />
          <span className="w-7 h-1 bg-blue-700 rounded transition" />
        </button>
      </div>
      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-lg px-6 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-800 hover:text-blue-600 font-medium transition"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </motion.nav>
  );
}