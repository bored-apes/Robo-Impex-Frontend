"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Cpu, Zap, Microscope as Microchip, CircuitBoard, Cog } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (containerRef.current && windowSize.width > 768) {
        // Only on desktop
        const rect = containerRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        setMousePosition({ x, y })
      }
    },
    [windowSize.width],
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (container && windowSize.width > 768) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMouseMove, windowSize.width])

  const techIcons = [
    { Icon: Cpu, delay: 0, position: { top: "15%", left: "8%" } },
    { Icon: Microchip, delay: 1, position: { top: "25%", right: "12%" } },
    { Icon: CircuitBoard, delay: 2, position: { top: "55%", left: "6%" } },
    { Icon: Cog, delay: 3, position: { top: "65%", right: "10%" } },
    { Icon: Zap, delay: 4, position: { top: "35%", right: "6%" } },
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden interactive-zone mt-10"
      onMouseEnter={() => windowSize.width > 768 && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background with responsive gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="absolute inset-0 tech-grid opacity-20 sm:opacity-30" />

        {/* Mouse follower - only on desktop */}
        {windowSize.width > 768 && (
          <div
            className="mouse-follower absolute w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full pointer-events-none opacity-10 sm:opacity-20"
            style={{
              background: `radial-gradient(circle, var(--color-primary) 0%, transparent 70%)`,
              transform: `translate(${mousePosition.x - (windowSize.width > 640 ? 192 : 128)}px, ${mousePosition.y - (windowSize.width > 640 ? 192 : 128)}px)`,
              transition: isHovered ? "none" : "transform 0.3s ease-out",
            }}
          />
        )}
      </div>

      {/* Floating tech icons - hidden on mobile for performance */}
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
                  ? `translate(${(mousePosition.x - windowSize.width / 2) * 0.01}px, ${(mousePosition.y - windowSize.height / 2) * 0.01}px)`
                  : "none",
              transition: "transform 0.3s ease-out",
            }}
          >
            <Icon className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary animate-circuit-pulse" />
          </div>
        ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            {/* Badge */}
            <Badge
              variant="secondary"
              className="px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 transition-all duration-300 shadow-lg backdrop-blur-sm"
            >
              <Microchip className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-circuit-pulse" />
              Premium Robotics & Machinery Components
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight font-mono">
              <span className="text-gradient block sm:inline">Advanced Robotics</span>
              <br className="hidden sm:block" />
              <span className="text-foreground block sm:inline mt-2 sm:mt-0">Components & Chips</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto px-2 sm:px-4 lg:px-0">
              Discover premium microchips, sensors, robotic parts, and machinery components. From airplane chips to
              industrial automation - we power your innovations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 sm:pt-8">
              <Button
                size="lg"
                className="group transition-all duration-300 hover:scale-105 bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl px-8 sm:px-10 py-4 sm:py-5 hover-lift w-full sm:w-auto text-base sm:text-lg font-semibold"
                asChild
              >
                <Link href="/products">
                  <CircuitBoard className="mr-3 h-5 w-5 sm:h-6 sm:w-6 animate-chip-glow" />
                  Explore Components
                  <ArrowRight className="ml-3 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-8 sm:pt-12 max-w-4xl mx-auto">
              {[
                { icon: Cpu, value: "10K+", label: "Microchips" },
                { icon: CircuitBoard, value: "5K+", label: "Circuit Boards" },
                { icon: Cog, value: "2K+", label: "Robotic Parts" },
                { icon: Zap, value: "1K+", label: "Sensors" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center group cursor-pointer chip-card p-4 sm:p-6 rounded-xl hover:bg-muted/50 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="flex flex-col items-center justify-center mb-2">
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-2 group-hover:scale-125 transition-transform animate-circuit-pulse" />
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary group-hover:text-accent transition-colors font-mono">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-sm sm:text-base text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background circuit pattern - simplified for mobile */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 opacity-5 pointer-events-none">
        <CircuitBoard className="w-full h-full text-primary animate-rotate-slow" />
      </div>
    </section>
  )
}
