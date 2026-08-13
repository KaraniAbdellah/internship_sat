export default function Settings() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Hello Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account preferences and system configurations.</p>
      </div>

      {/* Example Settings Form */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 max-w-xl space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">System Name</label>
          <input
            type="text"
            defaultValue="Optimic AI Platform"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#c81000]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Admin Email</label>
          <input
            type="email"
            defaultValue="admin@optimic.ai"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#c81000]"
          />
        </div>
        <button className="px-5 py-2.5 bg-[#c81000] text-white font-semibold text-sm rounded-xl hover:bg-red-700 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}