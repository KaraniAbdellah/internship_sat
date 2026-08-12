import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import image from "@/assets/optimic.png";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Agents', href: '#agents' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Dashboard', href: '/optimic' },
];

export default function Header() {
  const [activeLabel, setActiveLabel] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 inset-x-0 z-50 p-2 sm:px-6 bg-gradient-to-b from-white via-orange-50/50 to-red-50/30"
    >
      <motion.div
        animate={{
          maxWidth: isScrolled ? '1000px' : '1280px',
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0)',
          boxShadow: isScrolled
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)'
            : '0 0px 0px 0px rgba(0,0,0,0)',
          borderRadius: isScrolled ? '9999px' : '0px',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          paddingTop: isScrolled ? '0.75rem' : '1rem',
          paddingBottom: isScrolled ? '0.75rem' : '1rem',
          borderWidth: isScrolled ? '1px' : '0px',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between mx-auto backdrop-blur-xl border-slate-200/80 transition-colors"
      >
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0">
          <img
            src={image}
            alt="Optimic Logo"
            className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 group-hover:text-[#ff1d00] transition-colors">
            Optimic<span className="text-[#ff1d00]">.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/60 shadow-xs mx-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = activeLabel === item.label;
            return (
              <div key={item.label} className="relative">
                <a
                  href={item.href}
                  onClick={() => setActiveLabel(item.label)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {item.label}
                </a>
              </div>
            );
          })}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:block bg-[#ff1d00] text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-[#e01900] transition-colors shadow-xs cursor-pointer"
          >
            <a href="/auth" className="text-white font-semibold">Login / Register</a>
          </motion.button>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, marginTop: 0 }}
            animate={{ opacity: 1, marginTop: 12 }}
            exit={{ opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/80 p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeLabel === item.label;
                  return (
                    <div key={item.label} className="flex flex-col">
                      <a
                        href={item.href}
                        onClick={() => {
                          setActiveLabel(item.label);
                          setMobileMenuOpen(false);
                        }}
                        className={`px-4 py-3 rounded-2xl text-base font-semibold transition-colors ${
                          isActive
                            ? 'bg-slate-100 text-[#ff1d00]'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        {item.label}
                      </a>
                    </div>
                  );
                })}
              </div>

              <div className="h-[1px] bg-slate-100 my-0.5" />

              <button className="w-full bg-[#ff1d00] text-white text-sm font-bold py-3.5 rounded-2xl shadow-md active:scale-[0.98] transition-transform">
                Login / Register
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
