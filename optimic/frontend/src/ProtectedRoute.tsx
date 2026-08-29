import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  children: ReactNode;
}

export default function ProtectedRoute({
  isAuthenticated,
  isLoading,
  children,
}: ProtectedRouteProps) {
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center text-slate-900 bg-white">
        Checking authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
