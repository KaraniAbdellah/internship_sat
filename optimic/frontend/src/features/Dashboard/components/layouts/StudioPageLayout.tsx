import { ReactNode } from "react";

type StudioPageLayoutProps = {
  workspace: ReactNode;
};

export default function StudioPageLayout({
  workspace,
}: StudioPageLayoutProps) {
  return (
    <div className="h-full bg-[#FDFBF9] text-slate-800 flex flex-col font-sans antialiased overflow-hidden">
      <div className="flex-1 flex overflow-hidden">{workspace}</div>
    </div>
  );
}
