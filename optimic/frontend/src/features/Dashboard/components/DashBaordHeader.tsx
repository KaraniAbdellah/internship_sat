import { Sparkles, BarChart3, GitCommit, Cpu, RefreshCw } from 'lucide-react';

const AGENTS = [
  { name: 'Generation Agent', status: 'Active', icon: Sparkles, color: 'text-red-600', bg: 'bg-red-50', metric: '+142 offers/hr' },
  { name: 'Scoring Agent', status: 'Active', icon: BarChart3, color: 'text-indigo-600', bg: 'bg-indigo-50', metric: '+99.4% precision' },
  { name: 'Validation Agent', status: 'Processing', icon: GitCommit, color: 'text-amber-600', bg: 'bg-amber-50', metric: '+5 policies' },
  { name: 'Optimization Agent', status: 'Active', icon: Cpu, color: 'text-emerald-600', bg: 'bg-emerald-50', metric: '+32% Optimization' },
];

export default function DashboardHeader() {
  return (
    <header className="space-y-4">
      {/* Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Agent Network Status</h1>
          <p className="text-xs text-slate-500">Autonomous marketing orchestration & real-time offer generation</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            All systems nominal
          </span>
          <button className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-xl border border-slate-200 shadow-sm transition">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Agents Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {AGENTS.map((agent, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className={`p-2.5 rounded-xl ${agent.bg} ${agent.color}`}>
                <agent.icon className="w-5 h-5" />
              </div>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                agent.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
              }`}>
                {agent.status}
              </span>
            </div>
            <div className="mt-3">
              <p className="text-xs text-slate-500 font-medium">{agent.name}</p>
              <p className="text-sm font-bold text-slate-800">{agent.metric}</p>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}
