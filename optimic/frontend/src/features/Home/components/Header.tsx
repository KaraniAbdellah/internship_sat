import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import image from '../../../assets/optimic.png';

interface NavChildItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  children?: NavChildItem[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', active: true },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  {
    label: 'Solution',
    href: '#solution',
    children: [
      { label: 'Analytics', href: '#analytics' },
      { label: 'Automation', href: '#automation' },
    ],
  },
  { label: 'Dashboard', href: '/optimic' },
];

const LANGUAGES = [
  { label: 'English', code: 'en', emoji: '🇬🇧' },
  { label: 'French', code: 'fr', emoji: '🇫🇷' },
];

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`sticky top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 sm:gap-2.5 group">
          <img
            src={image}
            alt="Optimic Logo"
            className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 group-hover:text-[#ff1d00] transition-colors">
            Optimic<span className="text-[#ff1d00]">.</span>
          </span>
        </a>

        {/* Floating Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
          {NAV_ITEMS.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={item.href}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  item.active
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === item.label
                        ? 'rotate-180 text-[#ff1d00]'
                        : 'text-slate-400'
                    }`}
                  />
                )}
              </a>

              {/* Desktop Dropdown */}
              <AnimatePresence>
                {item.children && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 pt-2 w-48 z-50"
                  >
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 py-2 overflow-hidden">
                      {item.children.map((child, childIdx) => (
                        <a
                          key={childIdx}
                          href={child.href}
                          className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#ff1d00] transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <div className="h-4 w-[1px] bg-slate-300 mx-1" />

          {/* Desktop Language Selector */}
          <div
            className="relative"
            onMouseEnter={() => setIsLangOpen(true)}
            onMouseLeave={() => setIsLangOpen(false)}
          >
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200/50 transition-all cursor-pointer">
              <Globe className="w-4 h-4 text-slate-500" />
              <span>{selectedLang.code.toUpperCase()}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  isLangOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full pt-2 w-36 z-50"
                >
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 py-2 overflow-hidden">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLang(lang);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                          selectedLang.code === lang.code
                            ? 'font-semibold text-[#ff1d00] bg-orange-50/50'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span>{lang.label}</span>
                        <span>{lang.emoji}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
          >
            Login / Register
          </motion.button>
        </div>

        {/* Mobile Phone Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle Phone Navigation"
          className="md:hidden p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 focus:outline-none transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden px-4 sm:px-6 pt-3"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/80 p-5 flex flex-col gap-4">
              {/* Phone Navigation Links */}
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-2xl text-base font-semibold transition-colors ${
                        item.active
                          ? 'bg-slate-100 text-[#ff1d00]'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {item.label}
                    </a>

                    {/* Mobile Submenu Items */}
                    {item.children && (
                      <div className="pl-4 flex flex-col gap-1 my-1">
                        {item.children.map((child, childIdx) => (
                          <a
                            key={childIdx}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-[#ff1d00] hover:bg-slate-50 transition-colors"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="h-[1px] bg-slate-100 my-0.5" />

              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-semibold text-slate-500">Language</span>
                <div className="flex gap-1.5">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLang(lang)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedLang.code === lang.code
                          ? 'bg-[#ff1d00] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {lang.emoji} {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <button className="w-full bg-slate-900 text-white text-sm font-bold py-3.5 rounded-2xl shadow-md active:scale-[0.98] transition-transform">
                Login / Register
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}