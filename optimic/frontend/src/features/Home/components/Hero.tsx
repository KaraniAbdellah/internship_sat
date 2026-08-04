import { HeroLeft } from './HeroLeft';
import { HeroRight } from './HeroRight';



export default function Hero() {
  return (
    <section className="relative w-full px-10 py-6 overflow-hidden bg-white">
      {/* 1. Grid Pattern Texture Layer */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.06] mx-auto"
        style={{
          backgroundImage: `
            linear-gradient(#000 1px, transparent 1px),
            linear-gradient(90deg, #000 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* 2. Vertical Dashed Structural Lines */}
      <div className="absolute top-0 bottom-0 left-[15%] lg:left-[25%] border-r border-slate-200 border-dashed pointer-events-none z-0" />
      <div className="absolute top-0 bottom-0 right-[15%] lg:right-[25%] border-r border-slate-200 border-dashed pointer-events-none z-0" />

      {/* 3. Footer-Style Concentric Circles Line Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-slate-200/60 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-slate-200/50 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-slate-200/40 pointer-events-none z-0" />

      {/* Hero Content Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <HeroLeft />
        <HeroRight />
      </div>
    </section>
  );
}
