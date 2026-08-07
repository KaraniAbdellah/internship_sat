import { motion } from 'framer-motion';
import { Bot, TrendingUp, Sparkles } from 'lucide-react';
import woman_promotion from "../../../assets/woman_promotion.png";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

export function HeroDown() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative flex items-center justify-center w-full max-w-5xl mx-auto mt-12 lg:mt-16"
    >
      {/* Aspect-ratio card container */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[21/11] bg-gradient-to-b from-[#ff3c00] via-[#ff1d00] to-[#d91800] rounded-[36px] flex items-end justify-center overflow-hidden border border-orange-200/50 ">

        {/* Ambient Subtle Noise/Grid Texture */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 0%, rgba(255,255,255,0.4) 0%, transparent 75%)`
          }}
        />

        {/* Scaled image filling container */}
        <img
          src={woman_promotion}
          alt="AI Marketing Partner"
          className="w-full h-full object-cover object-top scale-110 translate-y-4 relative z-10 drop-shadow-md"
        />

        {/* Floating Badge 1: AI Agent Status */}
        <div className="absolute top-6 left-6 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 border border-white/60 hover:scale-105 transition-transform">
          <div className="p-2.5 bg-orange-50 text-[#ff1d00] rounded-xl border border-orange-100">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI Agent</p>
            <p className="text-xs font-extrabold text-slate-900">Generation Engine</p>
          </div>
        </div>

        {/* Floating Badge 2: Conversion Boost */}
        <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 border border-white/60 hover:scale-105 transition-transform">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Conversion Score</p>
            <p className="text-xs font-extrabold text-slate-900">+98.4% Match</p>
          </div>
        </div>

        {/* Floating Badge 3: Generate Trigger */}
        <div className="absolute top-6 right-6 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white/60 hidden sm:flex items-center gap-2 hover:scale-105 transition-transform">
          <Sparkles className="w-4 h-4 text-[#ff1d00]" />
          <span className="text-xs font-extrabold text-slate-900">Generate Offer</span>
        </div>

      </div>
    </motion.div>
  );
}

export default HeroDown;