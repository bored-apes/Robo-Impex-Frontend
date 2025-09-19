"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Zap,
  Microscope as Microchip,
  CircuitBoard,
  Cog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (containerRef.current && windowSize.width > 768) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setMousePosition({ x, y });
      }
    },
    [windowSize.width]
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container && windowSize.width > 768) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, [handleMouseMove, windowSize.width]);

  const techIcons = [
    { Icon: Cpu, delay: 0, position: { top: "10%", left: "5%" } },
    { Icon: Microchip, delay: 1, position: { top: "20%", right: "5%" } },
    { Icon: CircuitBoard, delay: 2, position: { top: "50%", left: "5%" } },
    { Icon: Cog, delay: 3, position: { top: "60%", right: "5%" } },
    { Icon: Zap, delay: 4, position: { top: "30%", right: "5%" } },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden interactive-zone pt-4 md:pt-8"
      onMouseEnter={() => windowSize.width > 768 && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="absolute inset-0 tech-grid opacity-10 sm:opacity-20 md:opacity-30" />

        {windowSize.width > 768 && (
          <div
            className="mouse-follower absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full pointer-events-none opacity-10 sm:opacity-15 md:opacity-20"
            style={{
              background: `radial-gradient(circle, var(--color-primary) 0%, transparent 70%)`,
              transform: `translate(${
                mousePosition.x - (windowSize.width > 640 ? 160 : 96)
              }px, ${mousePosition.y - (windowSize.width > 640 ? 160 : 96)}px)`,
              transition: isHovered ? "none" : "transform 0.3s ease-out",
            }}
          />
        )}
      </div>

      {windowSize.width > 640 &&
        techIcons.map(({ Icon, delay, position }, index) => (
          <div
            key={index}
            className="absolute animate-float-gentle chip-card p-2 sm:p-3 md:p-4 rounded-lg glass-morphism hidden sm:block"
            style={{
              ...position,
              animationDelay: `${delay}s`,
              transform:
                isHovered && windowSize.width > 768
                  ? `translate(${
                      (mousePosition.x - windowSize.width / 2) * 0.01
                    }px, ${(mousePosition.y - windowSize.height / 2) * 0.01}px)`
                  : "none",
              transition: "transform 0.3s ease-out",
            }}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary animate-circuit-pulse" />
          </div>
        ))}

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in-up">
            <Badge
              variant="secondary"
              className="px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 transition-all duration-300 shadow-lg backdrop-blur-sm"
            >
              <Microchip className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 animate-circuit-pulse" />
              Premium Robotics & Machinery Components
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight font-mono">
              <span className="text-gradient block sm:inline">
                Advanced Robotics
              </span>
              <br className="hidden sm:block" />
              <span className="text-foreground block sm:inline mt-2 sm:mt-0">
                Components & Chips
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-2 sm:px-4">
              Discover premium microchips, sensors, robotic parts, and machinery
              components. From airplane chips to industrial automation - we
              power your innovations.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 sm:pt-6">
              <Button
                size="lg"
                className="group transition-all duration-300 hover:scale-105 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto text-sm sm:text-base md:text-lg font-semibold"
                asChild
              >
                <Link href="/products">
                  <CircuitBoard className="mr-2 h-4 w-4 sm:h-5 sm:h-5 animate-chip-glow" />
                  Explore Components
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 max-w-3xl mx-auto">
              {[
                { icon: Cpu, value: "10K+", label: "Microchips" },
                { icon: CircuitBoard, value: "5K+", label: "Circuit Boards" },
                { icon: Cog, value: "2K+", label: "Robotic Parts" },
                { icon: Zap, value: "1K+", label: "Sensors" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center group cursor-pointer chip-card p-3 sm:p-4 md:p-5 rounded-lg hover:bg-muted/50 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="flex flex-col items-center justify-center mb-2">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary mb-2 group-hover:scale-125 transition-transform animate-circuit-pulse" />
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary group-hover:text-accent transition-colors font-mono">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 opacity-5 pointer-events-none">
        <CircuitBoard className="w-full h-full text-primary animate-rotate-slow" />
      </div>
    </section>
  );
}
