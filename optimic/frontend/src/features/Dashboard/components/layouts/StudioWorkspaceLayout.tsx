import { ReactNode } from "react";

type StudioWorkspaceLayoutProps = {
  centerArea: ReactNode;
  rightSidebar: ReactNode;
};

export default function StudioWorkspaceLayout({
  centerArea,
  rightSidebar,
}: StudioWorkspaceLayoutProps) {
  return (
    <div className="flex flex-1 min-w-0 overflow-hidden">
      {centerArea}
      {rightSidebar}
    </div>
  );
}
