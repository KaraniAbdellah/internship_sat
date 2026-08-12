import { HeroTop } from './HeroTop';
import { HeroDown } from './HeroDown';

export default function Hero() {
  return (
    <section id='home' className="relative w-full py-4 overflow-hidden ">
      {/* Soft Minimal Ambient Radial Glow Layer inspired by reference */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] pointer-events-none z-0 opacity-60"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(220, 235, 255, 0.6) 0%, rgba(255, 220, 210, 0.3) 50%, transparent 75%)',
        }}
      />

      {/* Hero Content Container (Vertical Stack) */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center">
        <HeroTop />
        <HeroDown />
      </div>
    </section>
  );
}
