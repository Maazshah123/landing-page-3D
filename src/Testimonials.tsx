import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Saman Malik",
    role: "Customer Support Lead",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    review: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
  },
  {
    name: "Aliza Khan",
    role: "Business Analyst",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    review: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
  },
  {
    name: "Hassan Ali",
    role: "E-commerce Manager",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    review: "Using this ERP, our online presence and conversions significantly improved, boosting business performance.",
  },
  {
    name: "Omar Raza",
    role: "CEO",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    review: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
  },
  {
    name: "Bilal Ahmed",
    role: "IT Manager",
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
    review: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
  },
  {
    name: "Sana Sheikh",
    role: "Sales Manager",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    review: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
  },
  {
    name: "Zainab Hussain",
    role: "Project Manager",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    review: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
  },
  {
    name: "Adeel Farooq",
    role: "Finance Director",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    review: "Financial reporting is now a breeze. The analytics dashboard gives us real-time insights we've never had before.",
  },
  {
    name: "Mehwish Tariq",
    role: "HR Specialist",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    review: "Onboarding new employees is so much easier. The HR tools are intuitive and save us hours every week.",
  },
  {
    name: "Imran Qureshi",
    role: "Operations Manager",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    review: "Our business functions improved dramatically. The automation features are a game changer for our daily workflow.",
  },
];

// Split testimonials into 5 columns
function splitIntoColumns(arr: typeof testimonials, columns: number) {
  const cols: typeof testimonials[] = Array.from({ length: columns }, () => []);
  arr.forEach((item, i) => {
    cols[i % columns].push(item);
  });
  return cols;
}

const columns = 5;
const testimonialsColumns = splitIntoColumns(testimonials, columns);

export default function Testimonials() {
  // For each column, keep a scroll index
  const [indices, setIndices] = useState(Array(columns).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices((prev) => prev.map((idx, col) => (idx + 1) % testimonialsColumns[col].length));
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[520px] flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-400 py-24 px-2 overflow-hidden">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl pointer-events-none" />
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-14 drop-shadow-lg text-center"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
          viewport={{ once: true, amount: 0.7 }}
        >
          Testimonials
        </motion.h2>
        <div className="w-full flex flex-col md:flex-row gap-6 justify-center items-center md:items-stretch">
          {testimonialsColumns.map((col, colIdx) => (
            <div key={colIdx} className="flex-1 flex flex-col items-center min-w-[220px] max-w-xs">
              <div className="relative h-[340px] w-full flex flex-col items-center justify-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={indices[colIdx]}
                    initial={{ y: 60, opacity: 0, rotateX: 30 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -60, opacity: 0, rotateX: -30 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="bg-white/90 rounded-2xl shadow-2xl px-7 py-8 flex flex-col items-center w-full absolute top-0 left-0"
                    style={{
                      boxShadow: "0 8px 32px 0 rgba(59,130,246,0.18), 0 1.5px 8px 0 rgba(0,0,0,0.08)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <img
                      src={col[indices[colIdx]].avatar}
                      alt={col[indices[colIdx]].name}
                      className="w-14 h-14 rounded-full mb-3 border-4 border-white shadow-lg object-cover"
                    />
                    <p className="text-base text-gray-800 text-center mb-4">{col[indices[colIdx]].review}</p>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-gray-900">{col[indices[colIdx]].name}</span>
                      <span className="text-gray-500 text-xs">{col[indices[colIdx]].role}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 