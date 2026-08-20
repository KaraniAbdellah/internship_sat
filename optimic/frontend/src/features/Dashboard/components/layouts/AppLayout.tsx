import { ReactNode } from "react";

type AppLayoutProps = {
  sidebar: ReactNode;
  content: ReactNode;
};

export default function AppLayout({ sidebar, content }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] font-sans antialiased">
      {sidebar}
      <main className="flex-1 min-w-0 overflow-hidden">{content}</main>
    </div>
  );
}
