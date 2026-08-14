const CUSTOMERS = [
  { id: 'CUS-8921', score: 94, scoreColor: 'bg-emerald-500', segment: 'High Value', segmentBg: 'bg-emerald-50 text-emerald-700', lastPurchase: '2 hours ago', selected: true },
  { id: 'CUS-4432', score: 88, scoreColor: 'bg-emerald-400', segment: 'At Risk', segmentBg: 'bg-indigo-50 text-indigo-700', lastPurchase: '4 days ago', selected: false },
  { id: 'CUS-1109', score: 72, scoreColor: 'bg-rose-400', segment: 'New', segmentBg: 'bg-blue-50 text-blue-700', lastPurchase: '1 week ago', selected: false },
];

export default function CustomerDataPreview() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden space-y-4">
      {/* Table Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <h3 className="text-base font-bold text-slate-900">Data Preview</h3>
          <p className="text-xs text-slate-500">Select any customer row to inspect score and attributes</p>
        </div>
        <button className="text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm transition">
          View All Metrics
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-100">
            <tr>
              <th className="py-3 px-4">Customer ID</th>
              <th className="py-3 px-4">Behavior Score</th>
              <th className="py-3 px-4">Segment</th>
              <th className="py-3 px-4">Last Purchase</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {CUSTOMERS.map((cust) => (
              <tr
                key={cust.id}
                className={`cursor-pointer transition ${
                  cust.selected ? 'bg-red-50/40 border-l-4 border-red-600' : 'hover:bg-slate-50/80'
                }`}
              >
                <td className="py-3.5 px-4 font-bold text-slate-800">{cust.id}</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-700 w-6 text-xs">{cust.score}</span>
                    <div className="w-24 bg-slate-100 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${cust.scoreColor}`} style={{ width: `${cust.score}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md ${cust.segmentBg}`}>
                    {cust.segment}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-xs text-slate-500">{cust.lastPurchase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Query Input under the table */}
      <div className="p-4 pt-0 space-y-3">
        <textarea
          placeholder="Ask a question about selected customer (CUS-8921) or add offer instructions..."
          className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 placeholder:text-slate-400 min-h-[70px] resize-none"
        />
      </div>
    </div>
  );
}
