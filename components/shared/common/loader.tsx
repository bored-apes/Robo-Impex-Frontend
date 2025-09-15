"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
}

export function Loader({ size = "md", className, text }: LoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8", // Reduced from w-16 h-16
    md: "w-12 h-12", // Reduced from w-24 h-24
    lg: "w-16 h-16", // Reduced from w-32 h-32
    xl: "w-20 h-20", // Reduced from w-40 h-40
  };

  const textSizeClasses = {
    sm: "text-xs", // Reduced from text-sm
    md: "text-sm", // Reduced from text-base
    lg: "text-base", // Reduced from text-lg
    xl: "text-lg", // Reduced from text-xl
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-4",
        className
      )}
    >
      {" "}
      {/* Reduced space-y-8 to space-y-4 */}
      <div className="relative">
        <motion.div
          className={cn(
            "border-2 rounded-full", // Reduced border-4 to border-2
            "border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400",
            "bg-clip-border",
            sizeClasses[size]
          )}
          style={{
            background:
              "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #10b981, #3b82f6)",
            WebkitMask:
              "radial-gradient(circle at center, transparent 70%, black 72%, black 100%)",
            mask: "radial-gradient(circle at center, transparent 70%, black 72%, black 100%)",
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: {
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            animate={{
              rotateY: [0, 360],
              rotateX: [0, 15, -15, 0],
            }}
            transition={{
              rotateY: {
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              rotateX: {
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          >
            <motion.img
              src="/logo_transparent.png"
              alt="Loading..."
              className={cn(
                "object-contain drop-shadow-lg", // Reduced drop-shadow-2xl to drop-shadow-lg
                size === "sm" && "w-4 h-4", // Reduced from w-8 h-8
                size === "md" && "w-6 h-6", // Reduced from w-12 h-12
                size === "lg" && "w-8 h-8", // Reduced from w-16 h-16
                size === "xl" && "w-10 h-10" // Reduced from w-20 h-20
              )}
              animate={{
                scale: [1, 1.2, 0.9, 1.1, 1], // Reduced 1.3 to 1.2
                filter: [
                  "brightness(1) saturate(1) hue-rotate(0deg)",
                  "brightness(1.4) saturate(1.5) hue-rotate(30deg)",
                  "brightness(0.8) saturate(0.7) hue-rotate(-15deg)",
                  "brightness(1.2) saturate(1.3) hue-rotate(15deg)",
                  "brightness(1) saturate(1) hue-rotate(0deg)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute inset-0 rounded-full blur-md -z-10" // Reduced blur-lg to blur-md
              animate={{
                background: [
                  "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
                  "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
                  "radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)",
                  "radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)",
                  "radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)",
                  "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
                ],
                scale: [1, 1.4, 1.1, 1.3, 1], // Reduced scaling factors
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        <motion.div
          className={cn(
            "absolute inset-0 rounded-full -z-20 opacity-20",
            "bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20",
            "dark:from-blue-400/20 dark:via-purple-400/20 dark:to-pink-400/20",
            sizeClasses[size]
          )}
          animate={{
            scale: [1, 1.3, 1.1, 1.2, 1], // Reduced scaling factors
            rotate: [0, 180, 360],
            borderRadius: ["50%", "30%", "50%", "40%", "50%"],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
      {text && (
        <motion.div className="text-center space-y-2">
          {" "}
          {/* Reduced space-y-3 to space-y-2 */}
          <motion.p
            className={cn(
              "font-bold tracking-wider bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent",
              textSizeClasses[size]
            )}
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.01, 1], // Reduced 1.02 to 1.01
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {text}
          </motion.p>
          <motion.div className="flex justify-center space-x-1">
            {" "}
            {/* Reduced space-x-2 to space-x-1 */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400" // Reduced w-2 h-2 to w-1 h-1
                animate={{
                  scale: [0.8, 1.2, 0.8], // Reduced 1.4 to 1.2
                  opacity: [0.4, 0.8, 0.4], // Reduced 1 to 0.8
                  y: [0, -2, 0], // Reduced -4 to -2
                }}
                transition={{
                  duration: 1.8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export function SectionLoader({
  text = "Loading...",
  className,
  minHeight = "h-32", // Reduced from h-64
}: {
  text?: string;
  className?: string;
  minHeight?: string;
}) {
  return (
    <motion.div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br from-slate-50/50 to-white/50 dark:from-slate-900/50 dark:to-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50",
        minHeight,
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Loader size="md" text={text} />{" "}
      {/* Changed from size="lg" to size="md" */}
    </motion.div>
  );
}

export function InlineLoader({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "xs" | "sm" | "md";
}) {
  const sizeMap = {
    xs: "w-2 h-2", // Reduced from w-3 h-3
    sm: "w-3 h-3", // Reduced from w-4 h-4
    md: "w-4 h-4", // Reduced from w-5 h-5
  };

  return (
    <motion.div
      className={cn("inline-flex items-center justify-center", className)}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      <motion.img
        src="/logo_transparent.png"
        alt="Loading..."
        className={cn("opacity-80", sizeMap[size])}
        animate={{
          scale: [1, 1.05, 1], // Reduced 1.1 to 1.05
        }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
