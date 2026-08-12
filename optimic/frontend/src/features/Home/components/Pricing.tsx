export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 max-w-7xl mx-auto text-center">
      {/* Badge */}
      <div className="mb-4">
        <span className="text-[#ff1d00] text-xs font-bold tracking-widest uppercase bg-[#ff1d00]/10 px-3 py-1 rounded-full border border-[#ff1d00]/20">
          Pricing
        </span>
      </div>

      {/* Main Heading */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
        Choose the plan that fits your needs.
      </h2>

      <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mb-16">
        Collaborative intelligence designed to automate, evaluate, and optimize marketing offers in real time.
      </p>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch text-left">

        {/* Starter Plan */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-lg flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Starter</h3>
            <p className="text-slate-500 text-sm mt-1">Best for small businesses and early-stage teams</p>
            <div className="mt-6 mb-8 flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900">$49</span>
              <span className="text-slate-500 text-sm font-medium">/month</span>
            </div>

            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex items-center gap-3">
                <span className="text-[#ff1d00] font-bold">✓</span> Up to 2,500 offer generations
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#ff1d00] font-bold">✓</span> Generation Agent access
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#ff1d00] font-bold">✓</span> Standard Scoring Agent
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#ff1d00] font-bold">✓</span> Direct API CRM integration
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#ff1d00] font-bold">✓</span> Standard email support
              </li>
            </ul>
          </div>

          <button className="mt-8 w-full py-3 rounded-full bg-slate-100 text-slate-900 font-bold hover:bg-slate-200 transition-colors cursor-pointer">
            Choose Starter
          </button>
        </div>

        {/* Growth Plan (Highlighted / Featured) */}
        <div className="bg-[#ff1d00] text-white rounded-3xl p-8 shadow-xl shadow-[#ff1d00]/20 flex flex-col justify-between relative transform md:-translate-y-4">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#ff1d00] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
            Most Popular
          </div>

          <div>
            <h3 className="text-xl font-bold">Growth</h3>
            <p className="text-white/80 text-sm mt-1">Designed for scaling teams and growing businesses</p>
            <div className="mt-6 mb-8 flex items-baseline gap-1">
              <span className="text-4xl font-black">$149</span>
              <span className="text-white/80 text-sm font-medium">/month</span>
            </div>

            <ul className="space-y-4 text-sm text-white/90">
              <li className="flex items-center gap-3">
                <span className="font-bold">✓</span> Up to 15,000 offer generations
              </li>
              <li className="flex items-center gap-3">
                <span className="font-bold">✓</span> Full multi-agent suite access
              </li>
              <li className="flex items-center gap-3">
                <span className="font-bold">✓</span> Real-time campaign tracking
              </li>
              <li className="flex items-center gap-3">
                <span className="font-bold">✓</span> Automated Validation & Optimization
              </li>
              <li className="flex items-center gap-3">
                <span className="font-bold">✓</span> Priority support & EN/FR languages
              </li>
            </ul>
          </div>

          <button className="mt-8 w-full py-3 rounded-full bg-white text-[#ff1d00] font-bold hover:bg-slate-50 transition-colors shadow-md cursor-pointer">
            Choose Growth
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-lg flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Enterprise</h3>
            <p className="text-slate-500 text-sm mt-1">Built for high-volume enterprises and large teams</p>
            <div className="mt-6 mb-8 flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900">$499</span>
              <span className="text-slate-500 text-sm font-medium">/month</span>
            </div>

            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex items-center gap-3">
                <span className="text-[#ff1d00] font-bold">✓</span> Unlimited offer generations
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#ff1d00] font-bold">✓</span> Custom multi-agent workflows
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#ff1d00] font-bold">✓</span> Deep customer segmentation ML
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#ff1d00] font-bold">✓</span> Dedicated account manager
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#ff1d00] font-bold">✓</span> 24/7 priority support & uptime
              </li>
            </ul>
          </div>

          <button className="mt-8 w-full py-3 rounded-full bg-slate-100 text-slate-900 font-bold hover:bg-slate-200 transition-colors cursor-pointer">
            Choose Enterprise
          </button>
        </div>

      </div>
    </section>
  );
}
