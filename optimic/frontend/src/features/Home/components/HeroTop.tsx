import { motion } from "framer-motion";
import { Globe, ArrowRight } from "lucide-react";

const PRIMARY = "#ff1d00";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export function HeroTop() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-6 sm:gap-8 px-4"
    >
      {/* Top Avatar Badge (Adapted from design reference) */}
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-200/80 text-xs sm:text-sm font-medium text-slate-700">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((_, idx) => (
            <img
              key={idx}
              src={`https://randomuser.me/api/portraits/${idx % 2 === 0 ? "men" : "women"}/${30 + idx}.jpg`}
              alt="User"
              className="w-6 h-6 rounded-full border-2 border-white object-cover shadow-sm"
            />
          ))}
        </div>
        <span>
          Used by <strong className="text-zinc-900">1,200+</strong> teams &
          professionals
        </span>
      </div>

      {/* Main Headline with Boxed Highlights */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-zinc-900 leading-[1.15] tracking-tight">
        Write Your Offres <br className="hidden sm:block" />
        <span className="inline-block px-3.5 py-1.5 mx-1.5 my-1 -rotate-1 border-2 border-[#ff1d00] rounded-2xl text-[#ff1d00] bg-[#ff1d00]/10 shadow-md shadow-[#ff1d00]/10 transition-transform hover:rotate-0">
          Scoring
        </span>
        ,{" "}
        <span className="inline-block px-3.5 py-1.5 mx-1.5 my-1 rotate-1 border-2 border-[#ff1d00] rounded-2xl text-[#ff1d00] bg-[#ff1d00]/10 shadow-md shadow-[#ff1d00]/10 transition-transform hover:rotate-0">
          Validation
        </span>{" "}
        Generate and{" "}
        <span className="inline-block px-3.5 py-1.5 mx-1.5 my-1 -rotate-1 border-2 border-[#ff1d00] rounded-2xl text-[#ff1d00] bg-[#ff1d00]/10 shadow-md shadow-[#ff1d00]/10 transition-transform hover:rotate-0">
          Optimise
        </span>
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
        Automatically create personalized, context-aware offers, score client
        profiles, and optimize campaign conversions using collaborative AI
        agents.
      </p>

      {/* Combined Input & CTA Button */}
      <div className="w-full max-w-md flex flex-col gap-3 pt-2">
        <div className="flex items-center w-full bg-white border border-slate-200/90 rounded-2xl p-1.5 shadow-lg shadow-slate-100 focus-within:border-[#ff1d00]/50 transition-colors">
          <div className="flex items-center justify-center pl-3 pr-2 text-slate-400">
            <Globe className="w-5 h-5 stroke-[1.8]" />
          </div>
          <input
            type="text"
            placeholder="company.com"
            className="w-full px-2 py-2.5 bg-transparent text-slate-700 placeholder-slate-400 text-sm font-medium focus:outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-bold text-white transition-all duration-200 cursor-pointer shadow-md"
            style={{
              background: `linear-gradient(to bottom, ${PRIMARY}, #e01a00)`,
              boxShadow: `0 4px 14px ${PRIMARY}40`,
            }}
          >
            <span>Get Started</span>
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white/20">
              <ArrowRight size={14} strokeWidth={2.5} />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Ratings & Social Proof Footer */}
      <div className="flex items-center justify-center gap-2 pt-4 text-xs sm:text-sm text-slate-500">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/60 shadow-sm text-slate-600 font-medium">
          <span>🇲🇦</span>
          <span>Made in Morocco, privacy-friendly.</span>
        </div>
      </div>
    </motion.div>
  );
}

export default HeroTop;
