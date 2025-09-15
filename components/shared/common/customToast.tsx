"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ToastProps {
  id: string
  title?: string
  message: string
  type: "success" | "error" | "info" | "warning"
  duration?: number
  onClose: (id: string) => void
}

export function CustomToast({ id, title, message, type, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10)

    // Auto dismiss
    const dismissTimer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => {
      clearTimeout(timer)
      clearTimeout(dismissTimer)
    }
  }, [duration])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => {
      onClose(id)
    }, 300)
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "info":
      default:
        return <Info className="w-5 h-5 text-primary" />
    }
  }

  const getStyles = () => {
    const baseStyles = "relative overflow-hidden backdrop-blur-md border"

    switch (type) {
      case "success":
        return cn(baseStyles, "bg-green-50/90 border-green-200 dark:bg-green-950/90 dark:border-green-800")
      case "error":
        return cn(baseStyles, "bg-red-50/90 border-red-200 dark:bg-red-950/90 dark:border-red-800")
      case "warning":
        return cn(baseStyles, "bg-yellow-50/90 border-yellow-200 dark:bg-yellow-950/90 dark:border-yellow-800")
      case "info":
      default:
        return cn(baseStyles, "bg-primary/10 border-primary/20 dark:bg-primary/20 dark:border-primary/30")
    }
  }

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 w-96 max-w-sm p-4 rounded-lg shadow-lg transition-all duration-300 transform",
        getStyles(),
        isVisible && !isLeaving ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
      )}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 left-2 w-1 h-1 bg-primary/30 rounded-full animate-pulse" />
        <div className="absolute top-4 right-8 w-1 h-1 bg-primary/20 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-3 left-8 w-1 h-1 bg-primary/25 rounded-full animate-pulse delay-700" />
      </div>

      <div className="flex items-start gap-3 relative z-10">
        <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>

        <div className="flex-1 min-w-0">
          {title && <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>}
          <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
        </div>

        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full">
        <div
          className="h-full bg-primary transition-all ease-linear"
          style={{
            width: isVisible ? "0%" : "100%",
            transitionDuration: `${duration}ms`,
          }}
        />
      </div>
    </div>
  )
}

// Toast Provider Component
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = (toast: Omit<ToastProps, "id" | "onClose">) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { ...toast, id, onClose: removeToast }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  // Make addToast available globally
  useEffect(() => {
    ;(window as any).showToast = addToast
  }, [])

  return (
    <>
      {children}
      <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
        {toasts.map((toast) => (
          <CustomToast key={toast.id} {...toast} />
        ))}
      </div>
    </>
  )
}

// Hook for using toast
export function useCustomToast() {
  const showToast = (toast: Omit<ToastProps, "id" | "onClose">) => {
    if (typeof window !== "undefined" && (window as any).showToast) {
      ;(window as any).showToast(toast)
    }
  }

  return { showToast }
}
