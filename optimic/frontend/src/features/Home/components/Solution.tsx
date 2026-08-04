import { Bot, LineChart, ShieldCheck, Cpu } from 'lucide-react';

const agents = [
  {
    id: "generation",
    name: "Generation Agent",
    subtitle: "Agent de Génération",
    description: "Creates context-aware, personalized marketing offers dynamically tailored to customer profiles and purchase history.",
    icon: Bot,
    bg: "bg-gradient-to-br from-[#ff1d00] to-orange-600",
  },
  {
    id: "scoring",
    name: "Scoring & Prediction Agent",
    subtitle: "Agent de Scoring",
    description: "Leverages machine learning models to predict engagement probability and score the most attractive offer per segment.",
    icon: LineChart,
    bg: "bg-gradient-to-br from-orange-500 to-[#ff1d00]",
  },
  {
    id: "validation",
    name: "Validation Agent",
    subtitle: "Agent de Validation",
    description: "Enforces business rules, safety thresholds, and profitability criteria before releasing offers.",
    icon: ShieldCheck,
    bg: "bg-gradient-to-br from-[#ff1d00] to-[#ff1d00]",
  },
  {
    id: "optimization",
    name: "Optimization Agent",
    subtitle: "Agent d'Optimisation",
    description: "Continuously tracks conversion metrics and collaborates with other agents to dynamically refine active campaigns.",
    icon: Cpu,
    bg: "bg-gradient-to-br from-orange-600 to-[#ff1d00]",
  },
];

export default function Solution() {
  return (
    <section id='solution' className="py-16 px-4 max-w-7xl mx-auto text-center">
      <div className="mb-12">
        <span className="text-[#ff1d00] text-xs font-bold tracking-widest uppercase bg-[#ff1d00]/10 px-3 py-1 rounded-full border border-[#ff1d00]/20">
          Multi-Agent System
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
          Our AI Agent Architecture
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mt-2">
          Collaborative intelligence designed to automate, evaluate, and optimize marketing offers in real time.
        </p>
      </div>

      {/* Interactive Agent Cards Container */}
      <div className="agent-cards-container flex flex-wrap lg:flex-nowrap justify-center gap-6 p-4">
        {agents.map((agent) => {
          const Icon = agent.icon;
          return (
            <div
              key={agent.id}
              className={`agent-card ${agent.bg} text-white p-6 rounded-2xl flex flex-col justify-between items-start text-left cursor-pointer transition-all duration-400 ease-in-out flex-1 min-w-[250px] max-w-[320px] h-[280px] shadow-lg relative overflow-hidden group`}
            >
              {/* Top Row: Icon & Tag */}
              <div className="flex items-center justify-between w-full z-10">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-md text-white/90">
                  {agent.subtitle}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="z-10 mt-auto">
                <h3 className="text-xl font-bold leading-snug mb-2">
                  {agent.name}
                </h3>
                <p className="text-xs text-white/85 leading-relaxed">
                  {agent.description}
                </p>
              </div>

              {/* Background Glow Overlay */}
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
            </div>
          );
        })}
      </div>

      {/* Scoped CSS for Uiverse Blur & Scale Hover Effect */}
      <style>{`
        .agent-cards-container .agent-card {
          transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1), filter 400ms ease, opacity 400ms ease;
        }

        .agent-cards-container .agent-card:hover {
          transform: scale(1.08, 1.08);
          z-index: 20;
        }

        .agent-cards-container:hover > .agent-card:not(:hover) {
          filter: blur(6px);
          transform: scale(0.92, 0.92);
          opacity: 0.65;
        }
      `}</style>
    </section>
  );
}
