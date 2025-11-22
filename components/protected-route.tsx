"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "client";
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, loading, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    } else if (!loading && requiredRole && role !== requiredRole) {
      router.push("/dashboard");
    }
  }, [user, loading, router, requiredRole, role]);

  if (loading) {
    return (
      <div className="min-h-screen p-4">
        <Skeleton className="h-8 w-32 mb-4" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    );
  }

  if (!user || (requiredRole && role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
}
