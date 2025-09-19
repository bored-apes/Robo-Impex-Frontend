"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { CATEGORIES } from "@/data/constants";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import type { JSX } from "react/jsx-runtime";
import { AnimatedFeatureCategoryBackgroundIcons } from "../shared/common/animatedBackgroundIcons";

export function FeaturedCategories(): JSX.Element {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <section
      ref={containerRef}
      className="relative py-20 px-4 md:px-16 overflow-hidden"
    >
      <AnimatedFeatureCategoryBackgroundIcons />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="categoryMesh"
                x={mousePosition.x * 0.3}
                y={mousePosition.y * 0.3}
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-primary/20"
                />
              </pattern>
              <radialGradient id="categoryGlow" cx="50%" cy="50%" r="40%">
                <stop offset="0%" stopColor="rgba(56, 182, 255, 0.2)" />
                <stop offset="100%" stopColor="rgba(56, 182, 255, 0)" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#categoryMesh)" />
            <circle
              cx={`${mousePosition.x}%`}
              cy={`${mousePosition.y}%`}
              r="150"
              fill="url(#categoryGlow)"
              className="transition-all duration-500"
            />
          </svg>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <defs>
            <filter
              id="categoryLineGlow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.line
              key={i}
              x1={`${20 + i * 10}%`}
              y1="20%"
              x2={`${30 + i * 8}%`}
              y2="80%"
              stroke="rgba(56, 182, 255, 0.3)"
              strokeWidth="1"
              filter="url(#categoryLineGlow)"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                strokeWidth: [1, 2, 1],
                x1: `${20 + i * 10 + (mousePosition.x - 50) * 0.1}%`,
                x2: `${30 + i * 8 + (mousePosition.x - 50) * 0.1}%`,
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent bg-[length:200%_100%]"
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            Browse by Category
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed"
            animate={{
              y: (mousePosition.y - 50) * 0.1,
            }}
            transition={{ duration: 0.5 }}
          >
            Discover our comprehensive range of industrial machinery and
            equipment across multiple specialized categories
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -12, scale: 1.05 }}
            >
              <Card className="group relative overflow-hidden border border-primary/20 bg-background/90 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:ring-2 hover:ring-primary/30 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/15 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100"></div>

                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-primary/60 rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`,
                      }}
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>

                <CardContent className="p-8 text-center relative">
                  <Link href="/products" className="block">
                    <div className="relative z-10">
                      <div className="mb-6 relative">
                        <motion.div
                          className="relative"
                          whileHover={{
                            rotate: [0, -10, 10, 0],
                            scale: 1.3,
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150"></div>
                          <motion.div
                            className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0, 0.5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                            }}
                          />
                          <Icon
                            icon={category.icon}
                            className="h-16 w-16 mx-auto text-primary group-hover:text-primary relative z-10 drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-500"
                          />
                        </motion.div>
                      </div>

                      <motion.h3
                        className="font-semibold text-base group-hover:text-primary transition-all duration-500 mb-3 group-hover:font-bold"
                        animate={{
                          y: (mousePosition.y - 50) * 0.05,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {category.name}
                      </motion.h3>

                      <motion.div
                        className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"
                        initial={{ width: 0 }}
                        whileHover={{ width: "70%" }}
                        transition={{ duration: 0.4 }}
                      />

                      <motion.div
                        className="h-px bg-primary/50 mx-auto mt-1 opacity-0 group-hover:opacity-100"
                        initial={{ width: 0 }}
                        whileHover={{ width: "40%" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.p
            className="text-muted-foreground mb-4"
            animate={{
              y: (mousePosition.y - 50) * 0.05,
            }}
            transition={{ duration: 0.5 }}
          >
            Can't find what you're looking for?
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/contact-us"
              className="text-primary hover:text-primary/80 font-semibold transition-colors duration-300 underline underline-offset-4 hover:underline-offset-8"
            >
              Contact our specialists for custom solutions
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
