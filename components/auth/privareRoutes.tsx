"use client"

import { useAuth } from "@/context/authContext"
import { useRouter } from "next/navigation"
import { useEffect, type ReactNode } from "react"
import { SectionLoader } from "@/components/shared/common/loader"
import { useToast } from "../shared/hooks/use-toast"

interface PrivateRouteProps {
  children: ReactNode
  redirectTo?: string
  showToast?: boolean
}

export function PrivateRoute({ children, redirectTo = "/login", showToast = true }: PrivateRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      if (showToast) {
        toast({
          title: "Authentication Required",
          description: "Please login to access this page.",
          variant: "destructive",
        })
      }
      router.push(redirectTo)
    }
  }, [isAuthenticated, isLoading, router, redirectTo, showToast, toast])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SectionLoader />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
