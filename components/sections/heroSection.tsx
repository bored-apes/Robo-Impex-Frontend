"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Cpu, Zap, Microscope as Microchip, CircuitBoard, Cog } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      setMousePosition({ x, y })
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMouseMove])

  const techIcons = [
    { Icon: Cpu, delay: 0, position: { top: "20%", left: "10%" } },
    { Icon: Microchip, delay: 1, position: { top: "30%", right: "15%" } },
    { Icon: CircuitBoard, delay: 2, position: { top: "60%", left: "8%" } },
    { Icon: Cog, delay: 3, position: { top: "70%", right: "12%" } },
    { Icon: Zap, delay: 4, position: { top: "40%", right: "8%" } },
  ]

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden interactive-zone"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-background">
        <div className="absolute inset-0 tech-grid opacity-30" />

        <div
          className="mouse-follower absolute w-96 h-96 rounded-full pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(circle, var(--color-primary) 0%, transparent 70%)`,
            transform: `translate(${mousePosition.x - 192}px, ${mousePosition.y - 192}px)`,
            transition: isHovered ? "none" : "transform 0.3s ease-out",
          }}
        />
      </div>

      {techIcons.map(({ Icon, delay, position }, index) => (
        <div
          key={index}
          className="absolute animate-float-gentle chip-card p-4 rounded-lg glass-morphism"
          style={{
            ...position,
            animationDelay: `${delay}s`,
            transform: isHovered
              ? `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`
              : "none",
            transition: "transform 0.3s ease-out",
          }}
        >
          <Icon className="w-8 h-8 text-primary animate-circuit-pulse" />
        </div>
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8 animate-fade-in-up">
            <Badge
              variant="secondary"
              className="px-6 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 transition-all duration-300 shadow-lg backdrop-blur-sm"
            >
              <Microchip className="w-4 h-4 mr-2 animate-circuit-pulse" />
              Premium Robotics & Machinery Components
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight font-mono">
              <span className="text-gradient">Advanced Robotics</span>
              <br />
              <span className="text-foreground">Components & Chips</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Discover premium microchips, sensors, robotic parts, and machinery components. From airplane chips to
              industrial automation - we power your innovations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="group transition-all duration-300 hover:scale-105 bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl px-8 py-4 hover-lift"
                asChild
              >
                <Link href="/products">
                  <CircuitBoard className="mr-2 h-5 w-5 animate-chip-glow" />
                  Explore Components
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              {/* <Button
                variant="outline"
                size="lg"
                className="group transition-all duration-300 hover:scale-105 px-8 py-4 hover-lift bg-transparent"
                asChild
              >
                <Link href="/categories">
                  <Cog className="mr-2 h-5 w-5" />
                  Browse Categories
                </Link>
              </Button> */}
            </div>

            <div className="flex items-center justify-center space-x-8 pt-8">
              {[
                { icon: Cpu, value: "10K+", label: "Microchips" },
                { icon: CircuitBoard, value: "5K+", label: "Circuit Boards" },
                { icon: Cog, value: "2K+", label: "Robotic Parts" },
                { icon: Zap, value: "1K+", label: "Sensors" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center group cursor-pointer chip-card p-3 rounded-lg"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="flex items-center justify-center mb-1">
                    <stat.icon className="w-5 h-5 text-primary mr-2 group-hover:scale-125 transition-transform animate-circuit-pulse" />
                    <div className="text-2xl md:text-3xl font-bold text-primary group-hover:text-accent transition-colors font-mono">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none">
        <CircuitBoard className="w-full h-full text-primary animate-rotate-slow" />
      </div>
    </section>
  )
}
