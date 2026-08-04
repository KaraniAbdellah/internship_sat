import { motion } from 'framer-motion';
import { Star, Globe, ArrowRight, Sparkles } from 'lucide-react';

const PRIMARY = '#ff1d00';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export function HeroLeft() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="lg:col-span-6 flex flex-col items-start gap-6 sm:gap-8"
    >
      {/* Top Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff1d00]/10 text-[#ff1d00] text-xs font-bold tracking-wider uppercase border border-[#ff1d00]/20">
        <Sparkles className="w-3.5 h-3.5" />
        Multi-Agent AI Platform
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl
        font-extrabold text-zinc-900 leading-[1.08] tracking-tight">
        Generate Your <br />
        <span className="italic font-serif text-[#ff1d00]">
          Marketing Offers
        </span>
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg text-slate-600 max-w-lg font-normal leading-relaxed">
        Automatically create personalized, context-aware offers, score client profiles, and optimize campaign conversions using collaborative AI agents.
      </p>

      {/* Combined Input & CTA Button */}
      <div className="w-full max-w-md flex flex-col gap-3 pt-2">
        <div className="flex items-center w-full bg-white border border-slate-200/90 rounded-2xl p-1.5 shadow-sm focus-within:border-[#ff1d00]/50 transition-colors">
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
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-white transition-all duration-200 cursor-pointer shadow-md"
            style={{
              background: `linear-gradient(to bottom, ${PRIMARY}, #e01a00)`,
              boxShadow: `0 4px 14px ${PRIMARY}40`,
            }}
          >
            <span>Analyze</span>
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white/20">
              <ArrowRight size={14} strokeWidth={2.5} />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Ratings & Social Proof */}
      <div className="flex items-center gap-4 pt-2">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((_, idx) => (
            <img
              key={idx}
              src={`https://randomuser.me/api/portraits/${idx % 2 === 0 ? 'men' : 'women'}/${30 + idx}.jpg`}
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
            />
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>4.9</span>
          <span className="text-slate-400 font-normal">(1.2k reviews)</span>
        </div>
      </div>
    </motion.div>
  );
}

export default HeroLeft;
