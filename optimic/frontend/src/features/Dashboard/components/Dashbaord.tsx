import { useState } from 'react';
import Sidebar from './Sidebar';
import Content from './Content';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        onNotify={showNotification}
      />

      {/* Main Workspace */}
      <Content onNotify={showNotification} />

      {/* Coming Soon Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-2xl shadow-xl transition-all animate-bounce">
          ⚡ {toastMessage}
        </div>
      )}
    </div>
  );
}
