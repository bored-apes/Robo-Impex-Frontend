"use client";

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useCustomToast } from "../shared/common/customToast";

interface PrivateRouteProps {
  children: ReactNode;
  redirectTo?: string;
  showToastError?: boolean;
}

export function PrivateRoute({
  children,
  redirectTo = "/login",
  showToastError = true,
}: PrivateRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { showToast } = useCustomToast();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      if (showToastError) {
        showToast({
          type: "warning",
          title: "Authentication Required",
          message: "Please login to access this page.",
        });
      }
      router.push(redirectTo);
    }
  }, [
    isAuthenticated,
    isLoading,
    router,
    redirectTo,
    showToastError,
    showToast,
  ]);
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
