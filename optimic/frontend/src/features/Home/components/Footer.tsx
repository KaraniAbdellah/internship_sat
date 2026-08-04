import { ArrowRight, Send, Hexagon, Sparkles, Cpu, Layers } from 'lucide-react';
import optimic from '../../../assets/optimic.png';
export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#ff3c00] to-[#e01a00]
      text-white overflow-hidden font-sans mt-20">

      {/* 1. Subtle Grid Texture Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* 2. Vertical Dashed Divider Lines */}
      <div className="absolute top-0 bottom-0 left-[10%] lg:left-[25%] border-r border-white/20 border-dashed pointer-events-none z-0" />
      <div className="absolute top-0 bottom-0 right-[10%] lg:right-[25%] border-r border-white/20 border-dashed pointer-events-none z-0" />

      {/* 3. Concentric Circles (Centered at top) */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full border border-white/10 pointer-events-none z-0" />
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full border border-white/10 pointer-events-none z-0" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full border border-white/10 pointer-events-none z-0" />

      {/* Main Footer Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto pt-24 pb-40 px-6 sm:px-12 flex flex-col items-center text-center">

        {/* Top Arc of Icons */}
        <div className="relative flex justify-center items-end gap-5 sm:gap-8 h-24 mb-10 w-full max-w-md">
          <div className="p-2.5 bg-white/10 rounded-full backdrop-blur-md border border-white/20 translate-y-8">
            <Hexagon className="w-4 h-4 text-white/90" />
          </div>
          <div className="p-2.5 bg-white/10 rounded-full backdrop-blur-md border border-white/20 translate-y-3">
            <Cpu className="w-4 h-4 text-white/90" />
          </div>

          {/* Center Prominent Icon */}
          <div className="p-4 bg-white rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.2)] z-20 mx-2 -translate-y-2">
            <img src={optimic} className='w-10 h-10' alt="" />
          </div>

          <div className="p-2.5 bg-white/10 rounded-full backdrop-blur-md border border-white/20 translate-y-3">
            <Sparkles className="w-4 h-4 text-white/90" />
          </div>
          <div className="p-2.5 bg-white/10 rounded-full backdrop-blur-md border border-white/20 translate-y-8">
            <Layers className="w-4 h-4 text-white/90" />
          </div>
        </div>

        {/* Hero Heading & CTA Button */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-8 max-w-2xl text-white leading-tight">
          Your competitors are already optimizing offers. See where you stand.
        </h2>

        <button className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#ff1d00] text-sm font-bold rounded-lg hover:bg-slate-50 hover:scale-105 transition-all duration-200 shadow-xl shadow-white/10">
          Check AI visibility <ArrowRight className="w-4 h-4" />
        </button>

        {/* Footer Links Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 mt-32 text-left text-sm text-white/80">

          {/* Brand Column */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Send className="w-5 h-5 fill-white" />
              Optimic
            </div>
            <p className="max-w-[280px] leading-relaxed text-[13px]">
              Optimic tracks customer behavior and generates context-aware marketing offers using collaborative AI agents. See exactly what to publish to change the answer.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 flex flex-col gap-3.5">
            <h4 className="text-white font-semibold mb-1">Quick Links</h4>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">FAQ</a>
            <a href="#" className="hover:text-white transition-colors">Sign In</a>
          </div>

          {/* Company Column */}
          <div className="md:col-span-3 flex flex-col gap-3.5">
            <h4 className="text-white font-semibold mb-1">Company</h4>
            <a href="#" className="hover:text-white transition-colors">Twitter / X</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Imprint</a>
          </div>
        </div>
      </div>

      {/* Massive Bottom Text Overlay */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none translate-y-[22%]">
        <h1 className="text-[17vw] font-black text-white/10 leading-none tracking-tighter m-0 p-0">
          OPTIMIC
        </h1>
      </div>
    </footer>
  );
}
