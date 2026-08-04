import { ArrowRight, Bot, LineChart, ShieldCheck, Cpu } from 'lucide-react';

export default function Section() {
  const tableData = [
    {
      offer: "VIP Customer Loyalty Package",
      score: "98%",
      scoreColor: "bg-emerald-500",
      agents: [
        { icon: Bot, bg: "bg-indigo-50 text-indigo-600" },
        { icon: LineChart, bg: "bg-orange-50 text-orange-600" },
        { icon: ShieldCheck, bg: "bg-emerald-50 text-emerald-600" },
      ],
      demandBars: [true, true, true, true],
    },
    {
      offer: "Cart Abandonment 15% Discount",
      score: "84%",
      scoreColor: "bg-emerald-500",
      agents: [
        { icon: Bot, bg: "bg-indigo-50 text-indigo-600" },
        { icon: Cpu, bg: "bg-amber-50 text-amber-600" },
      ],
      demandBars: [true, true, true, false],
    },
    {
      offer: "Seasonal Tech Upsell Segment",
      score: "62%",
      scoreColor: "bg-amber-500",
      agents: [
        { icon: LineChart, bg: "bg-orange-50 text-orange-600" },
        { icon: ShieldCheck, bg: "bg-emerald-50 text-emerald-600" },
      ],
      demandBars: [true, true, false, false],
    },
  ];

  return (
    <section className="w-full border-3 border-[#ff1d00] rounded-[40px]
      max-w-7xl mx-auto py-16 px-6 lg:px-12 bg-white font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Column: Heading & Call to Action */}
        <div className="lg:col-span-6 flex flex-col items-start gap-6">
          <h2 className="text-2xl sm:text-5xl lg:text-4xl font-extrabold
            text-slate-900 tracking-tight leading-[1.12]">
            Generate optimal offers automatically.{' '}
            <span className="text-gray-400 font-semibold block sm:inline">
              Let's maximize your conversion rate.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
            Analyze customer profiles, predict purchase behavior, and score high-converting marketing offers using collaborative multi-agent AI models.
          </p>

          <button className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#ff1d00] hover:bg-[#e01a00] text-white text-base font-bold rounded-xl shadow-lg shadow-[#ff1d00]/20 transition-all duration-200 cursor-pointer group">
            <span>See how AI scores your customers</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right Column: Interactive Data Card */}
        <div className="lg:col-span-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-200/50">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-4 pr-4">Marketing Offer / Segment</th>
                    <th className="pb-4 px-2">Score</th>
                    <th className="pb-4 px-2">Agents</th>
                    <th className="pb-4 text-right">Demand</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {tableData.map((row, idx) => (
                    <tr key={idx} className="group">
                      {/* Offer Name */}
                      <td className="py-5 pr-4 font-semibold text-slate-800 text-xs sm:text-sm">
                        {row.offer}
                      </td>

                      {/* Score Indicator */}
                      <td className="py-5 px-2 font-bold text-slate-900 whitespace-nowrap">
                        <span className={`inline-block w-1.5 h-4 ${row.scoreColor} rounded-full mr-2 align-middle`} />
                        {row.score}
                      </td>

                      {/* Active AI Agents */}
                      <td className="py-5 px-2">
                        <div className="flex items-center gap-1.5">
                          {row.agents.map((agent, aIdx) => {
                            const IconComponent = agent.icon;
                            return (
                              <div
                                key={aIdx}
                                className={`p-1.5 rounded-lg border border-slate-100 ${agent.bg}`}
                              >
                                <IconComponent className="w-3.5 h-3.5" />
                              </div>
                            );
                          })}
                        </div>
                      </td>

                      {/* Meter Gauge */}
                      <td className="py-5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {row.demandBars.map((active, bIdx) => (
                            <span
                              key={bIdx}
                              className={`w-1.5 h-4 rounded-full ${
                                active ? 'bg-emerald-500' : 'bg-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
