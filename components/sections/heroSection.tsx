"use client";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Zap } from "lucide-react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { heroContent } from "@/data/constants";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, IOptions, RecursivePartial } from "@tsparticles/engine";

const Particles = dynamic(() => import("@tsparticles/react"), { ssr: false });

export function HeroSection() {
  const [arrowDirection, setArrowDirection] = useState<string>("");
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const electronicsIconUrls = useMemo(
    () => [
      "https://cdn.jsdelivr.net/npm/@mdi/svg@7.0.96/svg/chip.svg",
      "https://cdn.jsdelivr.net/npm/@mdi/svg@7.0.96/svg/developer-board.svg",
      "https://cdn.jsdelivr.net/npm/@mdi/svg@7.0.96/svg/memory.svg",
      "https://cdn.jsdelivr.net/npm/@mdi/svg@7.0.96/svg/resistor-nodes.svg",
      "https://cdn.jsdelivr.net/npm/@mdi/svg@7.0.96/svg/led-on.svg",
      "https://cdn.jsdelivr.net/npm/@mdi/svg@7.0.96/svg/radar.svg",
      "https://cdn.jsdelivr.net/npm/@mdi/svg@7.0.96/svg/wifi.svg",
      "https://cdn.jsdelivr.net/npm/@mdi/svg@7.0.96/svg/bluetooth.svg",
      "https://cdn.jsdelivr.net/npm/@mdi/svg@7.0.96/svg/usb.svg",
      "https://cdn.jsdelivr.net/npm/@mdi/svg@7.0.96/svg/battery.svg",
      "https://cdn.jsdelivr.net/npm/@mdi/svg@7.0.96/svg/flash.svg",
      "https://cdn.jsdelivr.net/npm/@mdi/svg@7.0.96/svg/cog.svg",
      "https://cdn.jsdelivr.net/npm/@mdi/svg@7.0.96/svg/cpu-64-bit.svg",
      "https://cdn.jsdelivr.net/npm/@mdi/svg@7.0.96/svg/microchip.svg",
      "https://cdn.jsdelivr.net/npm/@mdi/svg@7.0.96/svg/router-wireless.svg",
    ],
    []
  );

  // Base options for particles
  const baseOptions: RecursivePartial<IOptions> = useMemo(
    () => ({
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#38b6ff" },
        move: {
          enable: true,
          speed: { min: 0.2, max: 0.5 },
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "bounce" },
          attract: { enable: false },
        },
        opacity: {
          value: { min: 0.2, max: 1 },
          animation: { enable: true, speed: 1, minimumValue: 0.2 },
        },
        rotate: {
          value: { min: 0, max: 360 },
          animation: { enable: true, speed: 5 },
        },
        number: {
          value: 80,
          density: { enable: true, area: 800 },
        },
        shape: { type: "circle" },
        size: {
          value: { min: 1, max: 3 },
          animation: { enable: true, speed: 1, minimumValue: 1 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  // Options for floating icons
  const floatingOptions: RecursivePartial<IOptions> = useMemo(
    () => ({
      ...baseOptions,
      particles: {
        ...baseOptions.particles,
        number: { value: 15 },
        shape: {
          type: "image",
          image: electronicsIconUrls.map((url) => ({
            src: url,
            width: 32,
            height: 32,
          })),
        },
        size: { value: { min: 12, max: 20 }, random: true },
        move: { speed: { min: 0.1, max: 0.3 } },
        opacity: {
          value: { min: 0.2, max: 0.6 },
          animation: { enable: true, speed: 0.5 },
        },
        rotate: { animation: { speed: 10 } },
      },
    }),
    [electronicsIconUrls]
  );

  const [particleOptions, setParticleOptions] =
    useState<RecursivePartial<IOptions>>(baseOptions);
  const [floatingParticleOptions, setFloatingParticleOptions] =
    useState<RecursivePartial<IOptions>>(floatingOptions);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  }, []);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (
        !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      )
        return;

      event.preventDefault();
      setIsInteracting(true);
      setArrowDirection(event.key.replace("Arrow", "").toLowerCase());

      setParticleOptions((prev) => ({
        ...prev,
        particles: {
          ...prev.particles,
          move: { ...prev.particles?.move, speed: { min: 0.6, max: 1.5 } },
          opacity: { ...prev.particles?.opacity, value: { min: 0.4, max: 1 } },
        },
      }));

      setFloatingParticleOptions((prev) => ({
        ...prev,
        particles: {
          ...prev.particles,
          move: { ...prev.particles?.move, speed: { min: 0.3, max: 0.9 } },
          opacity: { ...prev.particles?.opacity, value: { min: 0.4, max: 1 } },
          size: { ...prev.particles?.size, value: { min: 18, max: 30 } },
        },
      }));

      setTimeout(() => {
        setIsInteracting(false);
        setArrowDirection("");
        setParticleOptions(baseOptions);
        setFloatingParticleOptions(floatingOptions);
      }, 1500);
    },
    [baseOptions, floatingOptions]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleKeyPress, handleMouseMove]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-primary/8">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="dynamicMesh"
                x={mousePosition.x * 0.5}
                y={mousePosition.y * 0.5}
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={isInteracting ? "1.5" : "0.5"}
                  className="text-primary/30"
                />
              </pattern>
              <radialGradient id="mouseGlow" cx="50%" cy="50%" r="30%">
                <stop offset="0%" stopColor="rgba(56, 182, 255, 0.4)" />
                <stop offset="100%" stopColor="rgba(56, 182, 255, 0)" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#dynamicMesh)" />
            <circle
              cx={`${mousePosition.x}%`}
              cy={`${mousePosition.y}%`}
              r={isInteracting ? "200" : "100"}
              fill="url(#mouseGlow)"
              className="transition-all duration-300"
            />
          </svg>
        </div>

        <Particles
          id="particles"
          {...({ init: particlesInit } as any)}
          options={particleOptions}
          className="absolute inset-0 pointer-events-none"
        />

        <Particles
          id="floating"
          {...({ init: particlesInit } as any)}
          options={floatingParticleOptions}
          className="absolute inset-0 pointer-events-none"
        />

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter
              id="advancedGlow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.circle
            cx="50%"
            cy="50%"
            r="80"
            fill="none"
            stroke="rgba(56, 182, 255, 0.6)"
            strokeWidth="3"
            filter="url(#advancedGlow)"
            animate={{
              r: isInteracting ? [80, 150, 120] : [80, 100, 80],
              strokeWidth: isInteracting ? [3, 8, 5] : [3, 4, 3],
              rotate: [0, 360],
              x: (mousePosition.x - 50) * 2,
              y: (mousePosition.y - 50) * 2,
            }}
            transition={{
              rotate: {
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              r: {
                duration: isInteracting ? 1.5 : 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              },
              x: { duration: 0.5 },
              y: { duration: 0.5 },
            }}
          />

          {Array.from({ length: 6 }).map((_, i) => (
            <motion.g key={i}>
              <motion.circle
                cx="50%"
                cy="50%"
                r="8"
                fill="rgba(56, 182, 255, 0.8)"
                filter="url(#advancedGlow)"
                animate={{
                  rotate: [0, 360],
                  scale: isInteracting ? [1, 2.5, 1.8] : [1, 1.3, 1],
                  x:
                    Math.cos((i * Math.PI * 2) / 6) *
                    (120 + (mousePosition.x - 50) * 0.5),
                  y:
                    Math.sin((i * Math.PI * 2) / 6) *
                    (120 + (mousePosition.y - 50) * 0.5),
                }}
                transition={{
                  rotate: {
                    duration: 15 + i * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  },
                  scale: {
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  },
                  x: { duration: 0.8 },
                  y: { duration: 0.8 },
                }}
              />
            </motion.g>
          ))}

          {Array.from({ length: 12 }).map((_, i) => (
            <motion.line
              key={i}
              x1="50%"
              y1="50%"
              x2={`${50 + Math.cos((i * Math.PI * 2) / 12) * 30}%`}
              y2={`${50 + Math.sin((i * Math.PI * 2) / 12) * 30}%`}
              stroke="rgba(56, 182, 255, 0.4)"
              strokeWidth="2"
              filter="url(#advancedGlow)"
              animate={{
                strokeWidth: isInteracting ? [2, 6, 4] : [2, 3, 2],
                opacity: isInteracting ? [0.4, 1, 0.7] : [0.4, 0.6, 0.4],
                rotate: [0, 360],
                x2: `${
                  50 +
                  Math.cos(
                    (i * Math.PI * 2) / 12 + (mousePosition.x - 50) * 0.01
                  ) *
                    (30 + mousePosition.x * 0.2)
                }%`,
                y2: `${
                  50 +
                  Math.sin(
                    (i * Math.PI * 2) / 12 + (mousePosition.y - 50) * 0.01
                  ) *
                    (30 + mousePosition.y * 0.2)
                }%`,
              }}
              transition={{
                rotate: {
                  duration: 25 + i,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                strokeWidth: { duration: 1.5 },
                x2: { duration: 0.6 },
                y2: { duration: 0.6 },
              }}
            />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              animate={{
                scale: isInteracting ? 1.1 : 1,
                y:
                  arrowDirection === "up"
                    ? -15
                    : arrowDirection === "down"
                    ? 15
                    : 0,
              }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                variant="secondary"
                className="px-6 py-2 text-sm font-medium bg-primary/20 text-[#38b6ff] border-primary/30 hover:bg-primary/25 transition-all duration-300 shadow-lg backdrop-blur-sm"
              >
                <Icon
                  icon="mdi:lightning-bolt"
                  className="w-4 h-4 mr-2 animate-pulse text-[#38b6ff]"
                />
                {heroContent.badge}
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              animate={{
                y:
                  arrowDirection === "up"
                    ? -25
                    : arrowDirection === "down"
                    ? 25
                    : 0,
                scale: isInteracting ? 1.05 : 1,
                x:
                  arrowDirection === "left"
                    ? -20
                    : arrowDirection === "right"
                    ? 20
                    : 0,
              }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent bg-[length:200%_100%]"
                animate={{
                  backgroundPosition: isInteracting
                    ? ["0% 50%", "100% 50%", "0% 50%"]
                    : ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: isInteracting ? 1.5 : 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                {heroContent.title}
              </motion.span>
              <br />
              <span className="text-foreground">{heroContent.subtitle}</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
              animate={{
                y:
                  arrowDirection === "up"
                    ? -10
                    : arrowDirection === "down"
                    ? 10
                    : 0,
                opacity: isInteracting ? 0.9 : 1,
                x:
                  arrowDirection === "left"
                    ? -15
                    : arrowDirection === "right"
                    ? 15
                    : 0,
              }}
              transition={{ duration: 0.6 }}
            >
              {heroContent.description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              animate={{ scale: isInteracting ? 1.1 : 1 }}
              transition={{ duration: 0.6 }}
            >
              <Button
                size="lg"
                className="group transition-all duration-300 hover:scale-105 bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl px-6 py-3"
                asChild
              >
                <Link href="/">
                  <motion.div
                    animate={{
                      scale: isInteracting ? [1, 2, 1.5] : [1, 1.2, 1],
                      rotate: isInteracting ? [0, 360] : 0,
                    }}
                    transition={{
                      duration: isInteracting ? 1.5 : 3,
                      repeat: isInteracting ? 0 : Number.POSITIVE_INFINITY,
                      repeatDelay: 3,
                    }}
                  >
                    <Zap className="mr-2 h-5 w-5" />
                  </motion.div>
                  Explore Components
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center justify-center space-x-8 pt-8"
              animate={{
                y:
                  arrowDirection === "up"
                    ? -20
                    : arrowDirection === "down"
                    ? 20
                    : 0,
                x:
                  arrowDirection === "left"
                    ? -20
                    : arrowDirection === "right"
                    ? 20
                    : 0,
              }}
              transition={{ duration: 0.6 }}
            >
              {heroContent.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.15 }}
                  animate={{
                    scale: isInteracting ? 1.2 : 1,
                    rotate: isInteracting ? [0, 15, -15, 0] : 0,
                  }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-center mb-1">
                    <Icon
                      icon={stat.icon}
                      className="w-5 h-5 text-primary mr-2 group-hover:scale-125 transition-transform"
                    />
                    <div className="text-2xl md:text-3xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-xs text-muted-foreground flex items-center justify-center gap-2 pt-6"
              animate={{
                opacity: isInteracting ? 1 : 0.7,
                scale: isInteracting ? 1.1 : 1,
              }}
              transition={{ duration: 0.6 }}
            >
              <Icon icon="mdi:keyboard" className="w-4 h-4" />
              <span>Use arrow keys to interact • Move mouse to explore</span>
              {isInteracting && (
                <motion.span
                  className="text-primary font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  • {arrowDirection.toUpperCase()} Active
                </motion.span>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
