import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_DATA } from '../conts';

export default function FAQ() {
  // Set the 6th question open by default to match your screenshot layout
  const [openIndex, setOpenIndex] = useState<number | null>(5);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-20 px-6 sm:px-12 font-sans border-t border-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left Headline */}
        <div className="lg:col-span-5 lg:sticky lg:top-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
            Frequently <br />
            asked questions
          </h2>
        </div>

        {/* Right Accordion List */}
        <div className="lg:col-span-7 divide-y divide-slate-200 border-t border-b border-slate-200">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.id} className="py-6 transition-colors duration-200">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-slate-600 transition-colors pr-4">
                    {item.question}
                  </span>

                  <div className="flex-shrink-0 text-slate-500 group-hover:text-slate-900 transition-colors">
                    {isOpen ? (
                      <Minus className="w-5 h-5 stroke-[1.8]" />
                    ) : (
                      <Plus className="w-5 h-5 stroke-[1.8]" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
