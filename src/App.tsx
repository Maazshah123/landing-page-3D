import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import Scrollbar from 'smooth-scrollbar';
import Navbar from "./Navbar";

const features = [
  {
    title: "Smart Task Planner",
    desc: "Organize your assignments and deadlines with intelligent suggestions.",
    icon: "calendar",
  },
  {
    title: "AI-Powered Study Assistant",
    desc: "Get instant help, explanations, and study tips powered by AI.",
    icon: "robot",
  },
  {
    title: "Progress Tracking",
    desc: "Visualize your learning journey and stay motivated.",
    icon: "progress",
    progress: true,
  },
  {
    title: "Collaboration Tools",
    desc: "Work together with classmates, share notes, and chat in real time.",
    icon: "🤝",
  },
];

const howItWorks = [
  {
    icon: "📝",
    title: "Sign Up & Set Your Goals",
    desc: "Create your account and tell us what you want to achieve."
  },
  {
    icon: "⚡",
    title: "Get AI-Powered Study Plans",
    desc: "Receive personalized study plans and instant help from our AI assistant."
  },
  {
    icon: "📊",
    title: "Track Progress & Collaborate",
    desc: "See your progress, stay motivated, and work with classmates."
  }
];

const faqs = [
  {
    question: "How does the AI help me study?",
    answer: "Our AI provides personalized study plans, instant explanations, and smart reminders to keep you on track.",
  },
  {
    question: "Can I collaborate with classmates?",
    answer: "Yes! You can create study groups, share notes, and chat in real time with your peers.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use industry-standard encryption and never share your data without your consent.",
  },
  {
    question: "How do I track my progress?",
    answer: "Your dashboard shows your completed tasks, study streaks, and progress towards your goals in real time.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, you can try all premium features free for 14 days—no credit card required!",
  },
  {
    question: "What devices are supported?",
    answer: "You can use our app on any device: web, iOS, and Android.",
  },
];

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
  // Add more testimonials as needed
];

// Calendar day animation
function AnimatedCalendar() {
  const [day, setDay] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setDay((prev) => (prev >= 31 ? 1 : prev + 1));
    }, 200);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className="inline-block text-4xl mb-4 select-none" role="img" aria-label="calendar">
      <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 28, position: 'relative', top: 6, left: 2, color: '#e53e3e' }}>{day}</span>
      <span style={{ fontSize: 36, marginLeft: 2 }}>📅</span>
    </span>
  );
}

// Robot head shake animation
function AnimatedRobot() {
  return (
    <motion.span
      className="inline-block text-4xl mb-4 select-none"
      role="img"
      aria-label="robot"
      animate={{ rotate: [0, -20, 20, -20, 20, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      style={{ display: 'inline-block' }}
    >
      🤖
    </motion.span>
  );
}

// Animated oval progress
function AnimatedOvalProgress({ percent }: { percent: number }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame: number;
    if (progress < percent) {
      frame = window.setTimeout(() => setProgress(progress + 1), 15);
    } else {
      setTimeout(() => setProgress(0), 1000);
    }
    return () => clearTimeout(frame);
  }, [progress, percent]);

  // SVG oval dimensions
  const rX = 60, rY = 30, cx = 70, cy = 40;
  const circumference = Math.PI * (3 * (rX + rY) - Math.sqrt((3 * rX + rY) * (rX + 3 * rY)));
  const offset = circumference * (1 - progress / 100);

  return (
    <div className="flex flex-col items-center w-full mt-4">
      <svg width={140} height={80}>
        <ellipse
          cx={cx}
          cy={cy}
          rx={rX}
          ry={rY}
          fill="#e0e7ff"
          stroke="#3b82f6"
          strokeWidth={6}
        />
        <ellipse
          cx={cx}
          cy={cy}
          rx={rX}
          ry={rY}
          fill="none"
          stroke="#2563eb"
          strokeWidth={6}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.2s linear' }}
        />
        <text
          x={cx}
          y={cy + 6}
          textAnchor="middle"
          fontSize={20}
          fill="#2563eb"
          fontWeight={700}
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
}

const Features = () => {
  // Scroll-based fade out
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.5, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative z-10 py-16 bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300"
    >
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-12"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
          viewport={{ once: true, amount: 0.7 }}
        >
          Features
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15, type: "spring", bounce: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(59,130,246,0.15)" }}
              className="bg-white/80 rounded-xl p-8 shadow-lg flex flex-col items-center text-center cursor-pointer transition-transform duration-300 border border-blue-200"
            >
              {feature.icon === "calendar" && <AnimatedCalendar />}
              {feature.icon === "robot" && <AnimatedRobot />}
              {feature.icon === "progress" && <AnimatedOvalProgress percent={75} />}
              {typeof feature.icon === "string" && !["calendar", "robot", "progress"].includes(feature.icon) && (
                <span className="text-4xl mb-4 select-none" role="img" aria-label={feature.title}>{feature.icon}</span>
              )}
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{feature.title}</h3>
              <p className="text-blue-600 mb-4">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const HowItWorks = () => (
  <section className="relative z-10 py-16 bg-gradient-to-b from-blue-300 via-blue-100 to-white">
    <div className="max-w-5xl mx-auto px-4">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-12"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
        viewport={{ once: true, amount: 0.7 }}
      >
        How It Works
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {howItWorks.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.2, type: "spring", bounce: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white/90 rounded-xl p-8 shadow-lg flex flex-col items-center text-center border border-blue-200"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 32px 0 rgba(59,130,246,0.15)" }}
          >
            <motion.div
              className="text-5xl mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 + 0.2 }}
              viewport={{ once: true }}
            >
              {step.icon}
            </motion.div>
            <h3 className="text-xl font-semibold text-blue-700 mb-2">{step.title}</h3>
            <p className="text-blue-600 mb-2">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="relative z-10 py-16 bg-gradient-to-b from-gray-900 via-gray-950 to-black">
      <div className="max-w-3xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
          viewport={{ once: true, amount: 0.7 }}
        >
          Questions and Answers
        </motion.h2>
        <div className="divide-y divide-gray-700">
          {faqs.map((faq, i) => (
            <div key={faq.question}>
              <button
                className="w-full flex justify-between items-center py-6 text-lg md:text-xl text-white font-medium focus:outline-none"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span>{faq.question}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0, scale: open === i ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-2xl ml-4 select-none flex items-center justify-center w-8 h-8"
                >
                  {open === i ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="inline-block"
                    >
                      ×
                    </motion.span>
                  ) : (
                    <motion.span
                      key="plus"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="inline-block"
                    >
                      +
                    </motion.span>
                  )}
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0, y: -20 }}
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                    className="text-gray-300 text-base md:text-lg px-2 pb-4"
                  >
                    <div>{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const benefitLabels = [
    { text: "Structured", color: "bg-gray-200 text-gray-800" },
    { text: "Engaging", color: "bg-pink-300 text-white" },
    { text: "Innovative", color: "bg-yellow-400 text-gray-900" },
    { text: "Data-driven", color: "bg-green-400 text-white" },
    { text: "Revolutionary", color: "bg-pink-500 text-white" },
    { text: "Accessible", color: "bg-gray-100 text-gray-800" },
    { text: "Informative", color: "bg-green-400 text-white" },
    { text: "Automated", color: "bg-pink-400 text-white" },
    { text: "Personalized Teaching", color: "bg-blue-500 text-white" },
    { text: "Cutting-edge", color: "bg-yellow-400 text-gray-900" },
    { text: "Integrated Collaboration", color: "bg-gray-200 text-gray-800" },
    { text: "Time-saving", color: "bg-pink-400 text-white" },
    { text: "Cooperating", color: "bg-gray-200 text-gray-800" },
    { text: "Community Building", color: "bg-gray-100 text-gray-800" },
    { text: "Real-time", color: "bg-green-500 text-white" },
  ];

  // Responsive grid settings
  const boxWidth = 180;
  const boxHeight = 56;
  const gridCols = 3;
  const gridRows = 3;
  const gridGap = -10;
  const gridWidth = gridCols * boxWidth + (gridCols - 1) * gridGap;
  const gridHeight = gridRows * boxHeight + (gridRows - 1) * gridGap;

  // Viewport detection
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20% 0px" });

  return (
    <section className="relative min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 via-gray-950 to-black overflow-x-hidden">
      <div className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12 leading-tight"
          style={{ fontFamily: 'inherit', letterSpacing: '-0.01em', minHeight: 80, marginTop: 0, marginBottom: 0, paddingTop: 8 }}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
          viewport={{ once: true, amount: 0.7 }}
        >
          <span className="inline-block">Benefits that elevate your</span>
          <br />
          <span className="inline-block relative">
            <span className="z-10 relative">teaching experience</span>
            <span className="absolute left-0 bottom-0 w-full h-2 bg-green-400 rounded-full opacity-60 -z-10" style={{ transform: 'translateY(60%)' }} />
          </span>
        </motion.h2>
        <div ref={sectionRef} className="relative flex items-center justify-center" style={{ width: gridWidth, height: gridHeight, minHeight: 220, marginTop: 40 }}>
          {/* Animated Dots/Particles on the left */}
          <div className="absolute left-[-500px] bottom[300px] top-1/2 -translate-y-1/2 z-0 pointer-events-none" style={{ width: 120, height: 260 }}>
            {[0, 1, 2, 3, 4].map((dot, i) => (
              <motion.div
                key={i}
                initial={{ y: 0, opacity: 0.7 }}
                animate={{
                  y: [0, -24, 0],
                  opacity: [0.7, 1, 0.7],
                  transition: {
                    duration: 3.5 + i * 0.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: i * 0.4,
                    ease: "easeInOut"
                  }
                }}
                style={{
                  position: 'absolute',
                  left: 16 + i * 18,
                  top: 30 + i * 38,
                  width: 22 + i * 7,
                  height: 22 + i * 7,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, #f472b6 60%, #a21caf 100%)`,
                  filter: 'blur(2px)',
                  opacity: 0.7 - i * 0.08,
                  zIndex: 0,
                  boxShadow: '0 0 32px 8px #f472b6, 0 0 12px 2px #a21caf',
                }}
              />
            ))}
          </div>
          {/* End Animated Dots/Particles */}
          {/* Animated SVG Blob on the right */}
          <motion.svg
            initial={{ scale: 0.95, opacity: 0.5, x: 0, y: 0 }}
            animate={{
              scale: [0.95, 1.08, 0.95],
              opacity: [0.5, 0.7, 0.5],
              x: [0, 20, 0],
              y: [0, -10, 0],
              transition: {
                duration: 7,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }
            }}
            viewBox="0 0 400 400"
            className="absolute right-[-180px] top-1/2 -translate-y-1/2 z-0 pointer-events-none"
            style={{ width: 340, height: 340, filter: 'blur(18px)', opacity: 0.45 }}
          >
            <defs>
              <radialGradient id="blobGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
              </radialGradient>
            </defs>
            <path
              fill="url(#blobGradient)"
              d="M320,200Q320,280,240,320Q160,360,100,300Q40,240,80,160Q120,80,200,80Q280,80,320,160Q360,240,320,200Z"
            />
          </motion.svg>
          {/* End Animated Blob */}
          {benefitLabels.map((benefit, i) => {
            const col = i % gridCols;
            const row = Math.floor(i / gridCols);
            const x = col * (boxWidth + gridGap);
            const y = row * (boxHeight + gridGap);
            return (
              <motion.div
                key={benefit.text}
                initial={{
                  y: 80,
                  opacity: 0,
                  scale: 0.85,
                }}
                animate={isInView ? {
                  y: y,
                  x: x,
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: 0.2 + i * 0.07,
                    type: "spring",
                    stiffness: 80,
                    damping: 14,
                  },
                } : {}}
                className={`absolute rounded-full px-8 py-4 font-bold shadow-2xl text-base md:text-lg select-none ${benefit.color}`}
                style={{
                  minWidth: boxWidth,
                  minHeight: boxHeight,
                  textAlign: 'center',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  border: '3px solid rgba(255,255,255,0.7)',
                  lineHeight: '1.2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: `calc(50% - ${gridWidth/2}px + ${x}px)`,
                  top: `calc(50% - ${gridHeight/2}px + ${y}px)`,
                  boxShadow: '0 8px 32px 0 rgba(59,130,246,0.15)',
                  userSelect: 'none',
                  cursor: 'default',
                  padding: '1.1rem 1.5rem',
                  fontSize: '1.1rem',
                }}
              >
                {benefit.text}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const Hero = () => (
  <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
    {/* Clean Video Background */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-0"
      src="https://videos.pexels.com/video-files/3141210/3141210-uhd_2560_1440_25fps.mp4"
    />
    {/* Overlay for readability */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-purple-100/80 z-10" />
    {/* Content */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative z-20"
    >
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
        Supercharge Your Studies with <span className="text-blue-600">AI</span>
      </h1>
      <p className="text-lg md:text-2xl text-gray-700 mb-7 max-w-1xl text-center">
        An all-in-one productivity tool for students—plan, learn, and achieve more with the power of AI.
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 text-lg">
        Get Started Free
      </button>
    </motion.div>
  </section>
);

function useSmoothScrollbar() {
  useEffect(() => {
    // Only initialize once
    if (!document.querySelector('#smooth-scrollbar')) {
      const wrapper = document.createElement('div');
      wrapper.id = 'smooth-scrollbar';
      // Move all body children into the wrapper
      while (document.body.firstChild) {
        wrapper.appendChild(document.body.firstChild);
      }
      document.body.appendChild(wrapper);
      Scrollbar.init(wrapper, { damping: 0.08 });
    }
  }, []);
}

function App() {
  useSmoothScrollbar();
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <FAQ />
      <Benefits />
      <Testimonials />
      <Footer />
    </>
  );
}

export default App;